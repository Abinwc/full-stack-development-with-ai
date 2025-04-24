import { initializeApp } from "firebase-admin/app";
import * as logger from "firebase-functions/logger";
import { defineString } from "firebase-functions/params";
import { onCall } from "firebase-functions/v2/https";
import pkg from "pg";
const { Pool } = pkg;

// Initialize Firebase Admin
initializeApp();

// Define database URL configuration parameter
const databaseUrl = defineString("database.url", {
  description:
    "postgresql://neondb_owner:npg_cvuoMde6f1Yt@ep-raspy-snow-a1zmy7aw-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require",
});

// Create a PostgreSQL pool
const getPool = () => {
  return new Pool({
    connectionString: databaseUrl.value(),
    ssl: {
      rejectUnauthorized: false,
    },
  });
};

// onCall function to get all projects
export const getProjects = onCall(
  {
    // Configure function settings
    memory: "256MiB",
    timeoutSeconds: 60,
    minInstances: 0,
  },
  async (request) => {
    try {
      logger.info("Fetching all projects", { structuredData: true });

      const pool = getPool();

      // Query to get projects with their highlights
      const projectQuery = `
      SELECT 
        p.id, 
        p.name, 
        p.type, 
        p.achievement,
        json_agg(
          json_build_object(
            'id', ph.id,
            'highlight', ph.highlight
          )
        ) as highlights
      FROM projects p
      JOIN project_highlights ph ON p.id = ph.project_id
      GROUP BY p.id, p.name, p.type, p.achievement
      ORDER BY p.id
    `;

      const { rows } = await pool.query(projectQuery);
      await pool.end();

      return {
        success: true,
        data: rows,
      };
    } catch (error: any) {
      logger.error("Database error when fetching projects:", error);

      throw new Error(
        `An error occurred while retrieving projects: ${error.message}`
      );
    }
  }
);

// onCall function to get a specific project by ID
export const getProjectById = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      const { projectId } = request.data;

      if (!projectId) {
        throw new Error("The function must be called with a valid projectId.");
      }

      logger.info(`Fetching project with ID: ${projectId}`, {
        structuredData: true,
      });

      const pool = getPool();

      const projectQuery = `
      SELECT 
        p.id, 
        p.name, 
        p.type, 
        p.achievement,
        json_agg(
          json_build_object(
            'id', ph.id,
            'highlight', ph.highlight
          )
        ) as highlights
      FROM projects p
      JOIN project_highlights ph ON p.id = ph.project_id
      WHERE p.id = $1
      GROUP BY p.id, p.name, p.type, p.achievement
    `;

      const { rows } = await pool.query(projectQuery, [projectId]);
      await pool.end();

      if (rows.length === 0) {
        throw new Error("Project not found");
      }

      return {
        success: true,
        data: rows[0],
      };
    } catch (error: any) {
      logger.error(`Error retrieving project: ${error.message}`);
      throw new Error(
        error.message || "An error occurred while retrieving the project"
      );
    }
  }
);

// onCall function to get all experience entries
export const getExperience = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      logger.info("Fetching all experience entries", { structuredData: true });

      const pool = getPool();

      // Query to get experience with achievements and projects
      const experienceQuery = `
      SELECT 
        e.id, 
        e.company, 
        e.role, 
        e.description,
        (
          SELECT json_agg(
            json_build_object(
              'id', ea.id,
              'achievement', ea.achievement
            )
          )
          FROM experience_achievements ea
          WHERE ea.experience_id = e.id
        ) as achievements,
        (
          SELECT json_agg(
            json_build_object(
              'id', ep.id,
              'project', ep.project
            )
          )
          FROM experience_projects ep
          WHERE ep.experience_id = e.id
        ) as projects
      FROM experience e
      ORDER BY e.id
    `;

      const { rows } = await pool.query(experienceQuery);
      await pool.end();

      // Handle null arrays (convert to empty arrays)
      rows.forEach((row) => {
        if (row.achievements === null) row.achievements = [];
        if (row.projects === null) row.projects = [];
      });

      return {
        success: true,
        data: rows,
      };
    } catch (error: any) {
      logger.error("Database error when fetching experience:", error);
      throw new Error(
        `An error occurred while retrieving experience data: ${error.message}`
      );
    }
  }
);

// onCall function to get a specific experience entry by ID
export const getExperienceById = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
  },
  async (request) => {
    try {
      const { experienceId } = request.data;

      if (!experienceId) {
        throw new Error(
          "The function must be called with a valid experienceId."
        );
      }

      logger.info(`Fetching experience with ID: ${experienceId}`, {
        structuredData: true,
      });

      const pool = getPool();

      const experienceQuery = `
      SELECT 
        e.id, 
        e.company, 
        e.role, 
        e.description,
        (
          SELECT json_agg(
            json_build_object(
              'id', ea.id,
              'achievement', ea.achievement
            )
          )
          FROM experience_achievements ea
          WHERE ea.experience_id = e.id
        ) as achievements,
        (
          SELECT json_agg(
            json_build_object(
              'id', ep.id,
              'project', ep.project
            )
          )
          FROM experience_projects ep
          WHERE ep.experience_id = e.id
        ) as projects
      FROM experience e
      WHERE e.id = $1
    `;

      const { rows } = await pool.query(experienceQuery, [experienceId]);
      await pool.end();

      if (rows.length === 0) {
        throw new Error("Experience not found");
      }

      // Handle null arrays
      if (rows[0].achievements === null) rows[0].achievements = [];
      if (rows[0].projects === null) rows[0].projects = [];

      return {
        success: true,
        data: rows[0],
      };
    } catch (error: any) {
      logger.error(`Error retrieving experience: ${error.message}`);
      throw new Error(
        error.message || "An error occurred while retrieving the experience"
      );
    }
  }
);

// Example of adding a project using onCall
export const addProject = onCall(
  {
    memory: "256MiB",
    timeoutSeconds: 60,
    // Optional: Require authentication
    // enforceAppCheck: true,
  },
  async (request) => {
    try {
      // Authentication check (optional)
      // if (!request.auth) {
      //   throw new Error('The function must be called while authenticated.');
      // }

      const { name, type, achievement, highlights } = request.data;

      if (!name || !type || !highlights || !Array.isArray(highlights)) {
        throw new Error(
          "The function must be called with valid project data: name, type, and highlights array."
        );
      }

      logger.info("Adding new project", { name, type, structuredData: true });

      const pool = getPool();

      // Start a transaction
      const client = await pool.connect();
      try {
        await client.query("BEGIN");

        // Insert project
        const projectResult = await client.query(
          "INSERT INTO projects (name, type, achievement) VALUES ($1, $2, $3) RETURNING id",
          [name, type, achievement]
        );

        const projectId = projectResult.rows[0].id;

        // Insert highlights
        for (const highlight of highlights) {
          await client.query(
            "INSERT INTO project_highlights (project_id, highlight) VALUES ($1, $2)",
            [projectId, highlight]
          );
        }

        await client.query("COMMIT");

        return {
          success: true,
          message: "Project created successfully",
          projectId,
        };
      } catch (error) {
        await client.query("ROLLBACK");
        throw error;
      } finally {
        client.release();
        await pool.end();
      }
    } catch (error: any) {
      logger.error(`Error adding project: ${error.message}`);
      throw new Error(
        error.message || "An error occurred while adding the project"
      );
    }
  }
);
