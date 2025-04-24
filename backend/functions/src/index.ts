import { neon } from "@neondatabase/serverless";
import * as logger from "firebase-functions/logger";
import { defineString } from "firebase-functions/params";
import { onCall } from "firebase-functions/v2/https";

// Define environment variable for Neon connection string
const NEON_CONNECTION_STRING = defineString("NEON_CONNECTION_STRING");

// Create a query executor function for parameterized queries
const executeQuery = async (queryText: string, params: any[] = []) => {
  try {
    // Create SQL connection inside the function, not at module level
    const sql = neon(NEON_CONNECTION_STRING.value());

    // Use the sql.query method for parameterized queries
    const result: any = await sql.query(queryText, params);
    return result.rows;
  } catch (error) {
    logger.error(
      "Database query error:",
      error instanceof Error ? error.message : String(error)
    );
    throw new Error("Database operation failed. Please try again later.");
  }
};

// Function to get all projects
export const getProjects = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      logger.info("getProjects function called");

      const query = `
      SELECT p.*, 
             jsonb_agg(h.highlight) AS highlights
      FROM projects p
      LEFT JOIN project_highlights h ON p.id = h.project_id
      GROUP BY p.id
      ORDER BY p.id
    `;

      logger.info("Executing query:", query);
      const projects = await executeQuery(query);
      logger.info("Query results:", JSON.stringify(projects));

      // Check if projects is empty or null
      if (!projects || projects.length === 0) {
        logger.info("No projects found in database");
        return { success: true, data: [] };
      }

      return { success: true, data: projects };
    } catch (error) {
      logger.error(
        "Error in getProjects:",
        error instanceof Error ? error.message : String(error)
      );
      throw new Error("Failed to retrieve projects");
    }
  }
);

// Function to get all experiences
export const getExperiences = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      logger.info("getExperiences function called");

      const query = `
      SELECT e.*,
             jsonb_agg(DISTINCT a.achievement) FILTER (WHERE a.achievement IS NOT NULL) AS achievements,
             jsonb_agg(DISTINCT p.project) FILTER (WHERE p.project IS NOT NULL) AS projects
      FROM experience e
      LEFT JOIN experience_achievements a ON e.id = a.experience_id
      LEFT JOIN experience_projects p ON e.id = p.experience_id
      GROUP BY e.id
      ORDER BY e.id
    `;

      const experiences = await executeQuery(query);

      return { success: true, data: experiences };
    } catch (error) {
      logger.error(
        "Error in getExperiences:",
        error instanceof Error ? error.message : String(error)
      );
      throw new Error("Failed to retrieve experiences");
    }
  }
);

// Function to get a specific project by ID
export const getProjectById = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      const projectId = request.data.projectId;

      if (!projectId) {
        throw new Error("Project ID is required");
      }

      logger.info(`getProjectById function called for project ${projectId}`);

      const query = `
      SELECT p.*, 
             jsonb_agg(h.highlight) FILTER (WHERE h.highlight IS NOT NULL) AS highlights
      FROM projects p
      LEFT JOIN project_highlights h ON p.id = h.project_id
      WHERE p.id = $1
      GROUP BY p.id
    `;

      const projects = await executeQuery(query, [projectId]);

      if (projects.length === 0) {
        throw new Error("Project not found");
      }

      return { success: true, data: projects[0] };
    } catch (error) {
      logger.error(
        "Error in getProjectById:",
        error instanceof Error ? error.message : String(error)
      );
      throw new Error("Failed to retrieve project");
    }
  }
);

// Function to get a specific experience by ID
export const getExperienceById = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      const experienceId = request.data.experienceId;

      if (!experienceId) {
        throw new Error("Experience ID is required");
      }

      logger.info(
        `getExperienceById function called for experience ${experienceId}`
      );

      const query = `
      SELECT e.*,
             jsonb_agg(DISTINCT a.achievement) FILTER (WHERE a.achievement IS NOT NULL) AS achievements,
             jsonb_agg(DISTINCT p.project) FILTER (WHERE p.project IS NOT NULL) AS projects
      FROM experience e
      LEFT JOIN experience_achievements a ON e.id = a.experience_id
      LEFT JOIN experience_projects p ON e.id = p.experience_id
      WHERE e.id = $1
      GROUP BY e.id
    `;

      const experiences = await executeQuery(query, [experienceId]);

      if (experiences.length === 0) {
        throw new Error("Experience not found");
      }

      return { success: true, data: experiences[0] };
    } catch (error) {
      logger.error(
        "Error in getExperienceById:",
        error instanceof Error ? error.message : String(error)
      );
      throw new Error("Failed to retrieve experience");
    }
  }
);
