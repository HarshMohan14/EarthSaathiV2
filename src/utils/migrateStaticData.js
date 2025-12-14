// Migration script to add static data to Supabase database
// Run this once to migrate static team members, advisors, projects, and solutions to the database

import { adminTeamAPI, adminAdvisorsAPI, adminProjectsAPI, adminSolutionsAPI } from './adminApi';
import { teamData } from './teamData';
import { advisorsData } from './advisorsData';
import { projectsData } from './projectsData';
import { solutionsData } from './solutionsData';

export const migrateStaticData = async () => {
  const results = {
    team: { success: [], errors: [] },
    advisors: { success: [], errors: [] },
    projects: { success: [], errors: [] },
    solutions: { success: [], errors: [] }
  };

  // Migrate Team Members
  console.log('Migrating static team members to database...');
  for (const member of teamData) {
    try {
      // Check if already exists
      const allTeam = await adminTeamAPI.getAll().catch(() => []);
      const exists = allTeam.some(
        t => t.name === member.name && t.designation === member.designation
      );

      if (!exists) {
        await adminTeamAPI.create({
          name: member.name,
          designation: member.designation,
          quote: member.quote || '',
          image_url: member.imageUrl || ''
        });
        results.team.success.push(member.name);
        console.log(`✓ Migrated team member: ${member.name}`);
      } else {
        console.log(`- Team member already exists: ${member.name}`);
      }
    } catch (error) {
      results.team.errors.push({ name: member.name, error: error.message });
      console.error(`✗ Failed to migrate team member ${member.name}:`, error);
    }
  }

  // Migrate Advisors
  console.log('Migrating static advisors to database...');
  for (const advisor of advisorsData) {
    try {
      // Check if already exists
      const allAdvisors = await adminAdvisorsAPI.getAll().catch(() => []);
      const exists = allAdvisors.some(
        a => a.name === advisor.name && a.title === advisor.title
      );

      if (!exists) {
        await adminAdvisorsAPI.create({
          name: advisor.name,
          title: advisor.title,
          description: advisor.description || '',
          image_url: advisor.imageUrl || ''
        });
        results.advisors.success.push(advisor.name);
        console.log(`✓ Migrated advisor: ${advisor.name}`);
      } else {
        console.log(`- Advisor already exists: ${advisor.name}`);
      }
    } catch (error) {
      results.advisors.errors.push({ name: advisor.name, error: error.message });
      console.error(`✗ Failed to migrate advisor ${advisor.name}:`, error);
    }
  }

  // Migrate Projects
  console.log('Migrating static projects to database...');
  for (const project of projectsData) {
    try {
      // Check if already exists
      const allProjects = await adminProjectsAPI.getAll().catch(() => []);
      const exists = allProjects.some(
        p => p.title === project.title
      );

      if (!exists) {
        await adminProjectsAPI.create({
          title: project.title,
          subtitle: project.subtitle || '',
          image_url: project.imageUrl || '',
          sections: project.sections || []
        });
        results.projects.success.push(project.title);
        console.log(`✓ Migrated project: ${project.title}`);
      } else {
        console.log(`- Project already exists: ${project.title}`);
      }
    } catch (error) {
      results.projects.errors.push({ name: project.title, error: error.message });
      console.error(`✗ Failed to migrate project ${project.title}:`, error);
    }
  }

  // Migrate Solutions
  console.log('Migrating static solutions to database...');
  for (const solution of solutionsData) {
    try {
      // Check if already exists
      const allSolutions = await adminSolutionsAPI.getAll().catch(() => []);
      const exists = allSolutions.some(
        s => s.title === solution.title
      );

      if (!exists) {
        await adminSolutionsAPI.create({
          title: solution.title,
          description: solution.description || '',
          image_url: solution.imageUrl || '',
          image_position: solution.imagePosition || 'left',
          points: solution.points || []
        });
        results.solutions.success.push(solution.title);
        console.log(`✓ Migrated solution: ${solution.title}`);
      } else {
        console.log(`- Solution already exists: ${solution.title}`);
      }
    } catch (error) {
      results.solutions.errors.push({ name: solution.title, error: error.message });
      console.error(`✗ Failed to migrate solution ${solution.title}:`, error);
    }
  }

  return results;
};

// Function to run migration from browser console
if (typeof window !== 'undefined') {
  window.migrateStaticData = migrateStaticData;
}

