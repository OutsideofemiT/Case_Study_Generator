import inquirer from 'inquirer';
import fs from 'fs';
import chalk from 'chalk';

console.log(chalk.cyan.bold('\nProfessional Case Study Generator v2.0\n'));
console.log(chalk.gray('Tip: You can skip optional sections by leaving them blank or typing "skip"\n'));

const questions = [
  // 1. PROJECT OVERVIEW
  {
    type: 'input',
    name: 'projectName',
    message: 'Project Name:',
    validate: (input) => input.trim() !== '' || 'Project name is required'
  },
  {
    type: 'input',
    name: 'dateCompleted',
    message: 'Date Completed (e.g., October 2025):',
  },
  {
    type: 'input',
    name: 'client',
    message: 'Client/Organization (or type "Personal Project"):',
  },
  {
    type: 'input',
    name: 'teamMembers',
    message: 'Team Members (comma-separated, or leave blank if solo):',
  },
  {
    type: 'input',
    name: 'yourRole',
    message: 'Your Specific Role (e.g., Full-Stack Developer, Lead Dev):',
  },
  {
    type: 'input',
    name: 'projectType',
    message: 'Project Type (e.g., Web App, API, Landing Page):',
  },

  // 2. PROJECT GOALS
  {
    type: 'confirm',
    name: 'includeGoals',
    message: 'Include "Project Goals" section?',
    default: true
  },
  {
    type: 'input',
    name: 'primaryGoals',
    message: 'What were the main goals or objectives?',
    when: (answers) => answers.includeGoals
  },
  {
    type: 'input',
    name: 'whyImportant',
    message: 'Why were these goals important to the client/team?',
    when: (answers) => answers.includeGoals
  },

  // 3. CHALLENGE / PROBLEM STATEMENT
  {
    type: 'input',
    name: 'mainChallenge',
    message: 'What was the main challenge or problem?',
  },
  {
    type: 'input',
    name: 'tangibleIssues',
    message: 'What tangible issues did it cause (e.g., lost revenue, poor UX)?',
  },
  {
    type: 'input',
    name: 'problemType',
    message: 'Was this a technical, business, or UX problem (or combination)?',
  },
  {
    type: 'input',
    name: 'constraints',
    message: 'Any specific constraints (budget, timeline, technology)?',
  },

  // 4. SOLUTION / APPROACH
  {
    type: 'input',
    name: 'proposedSolution',
    message: 'What high-level solution did you propose?',
  },
  {
    type: 'input',
    name: 'alternativeSolutions',
    message: 'Were there alternative solutions considered? Why weren\'t they chosen?',
  },
  {
    type: 'input',
    name: 'requirementsGathering',
    message: 'How did you gather requirements (interviews, analytics, audits)?',
  },
  {
    type: 'input',
    name: 'designProcess',
    message: 'Did you use wireframes, prototypes, or design tools before coding?',
  },
  {
    type: 'input',
    name: 'technologies',
    message: 'Technologies Used (comma-separated):',
  },
  {
    type: 'input',
    name: 'whyTechnologies',
    message: 'Why did you choose these specific technologies?',
  },

  // 5. DESIGN & UX (OPTIONAL)
  {
    type: 'confirm',
    name: 'includeDesign',
    message: 'Include "Design & User Experience" section?',
    default: true
  },
  {
    type: 'input',
    name: 'uxDecisions',
    message: 'Key UX/UI decisions made:',
    when: (answers) => answers.includeDesign
  },
  {
    type: 'input',
    name: 'accessibility',
    message: 'Accessibility considerations:',
    when: (answers) => answers.includeDesign
  },
  {
    type: 'input',
    name: 'designTools',
    message: 'Design tools used (Figma, Adobe XD, etc.):',
    when: (answers) => answers.includeDesign
  },

  // 6. IMPLEMENTATION
  {
    type: 'input',
    name: 'majorSteps',
    message: 'What were the major milestones or steps in the build?',
  },
  {
    type: 'input',
    name: 'architecture',
    message: 'Describe the overall architecture or workflow:',
  },
  {
    type: 'input',
    name: 'criticalFeatures',
    message: 'Which features were most critical to build first?',
  },
  {
    type: 'input',
    name: 'blockers',
    message: 'What blockers or surprises came up along the way?',
  },
  {
    type: 'input',
    name: 'testing',
    message: 'How did you test or validate your solution?',
  },
  {
    type: 'input',
    name: 'codeSnippet',
    message: 'Any notable code snippet or technical highlight (optional):',
  },

  // 7. DEPLOYMENT & DEVOPS (OPTIONAL)
  {
    type: 'confirm',
    name: 'includeDeployment',
    message: 'Include "Deployment & DevOps" section?',
    default: true
  },
  {
    type: 'input',
    name: 'hostingPlatform',
    message: 'Hosting platform (Vercel, Render, AWS, etc.):',
    when: (answers) => answers.includeDeployment
  },
  {
    type: 'input',
    name: 'cicd',
    message: 'CI/CD pipeline or automation:',
    when: (answers) => answers.includeDeployment
  },
  {
    type: 'input',
    name: 'monitoring',
    message: 'Monitoring or analytics tools:',
    when: (answers) => answers.includeDeployment
  },

  // 8. RESULTS & IMPACT
  {
    type: 'input',
    name: 'measurableOutcomes',
    message: 'Measurable outcomes (metrics, performance improvements):',
  },
  {
    type: 'input',
    name: 'businessImpact',
    message: 'Impact on business or users:',
  },
  {
    type: 'input',
    name: 'beforeAfter',
    message: 'Any before/after comparison:',
  },
  {
    type: 'input',
    name: 'userFeedback',
    message: 'What did users or stakeholders say about the result?',
  },

  // 9. VISUAL SHOWCASE (OPTIONAL)
  {
    type: 'confirm',
    name: 'includeVisuals',
    message: 'Include "Visual Showcase" section (for screenshots/media)?',
    default: true
  },
  {
    type: 'input',
    name: 'screenshotLinks',
    message: 'Screenshot links or descriptions (comma-separated):',
    when: (answers) => answers.includeVisuals
  },

  // 10. KEY LEARNINGS
  {
    type: 'input',
    name: 'learnings',
    message: 'What did you learn from this project?',
  },
  {
    type: 'input',
    name: 'doDifferently',
    message: 'What would you do differently next time?',
  },
  {
    type: 'input',
    name: 'skillsGained',
    message: 'Any new skills or technologies you learned?',
  },

  // 11. FUTURE ENHANCEMENTS (OPTIONAL)
  {
    type: 'confirm',
    name: 'includeFuture',
    message: 'Include "Future Enhancements" section?',
    default: true
  },
  {
    type: 'input',
    name: 'futureFeatures',
    message: 'What would you add with more time or resources?',
    when: (answers) => answers.includeFuture
  },
  {
    type: 'input',
    name: 'scalability',
    message: 'Any scalability considerations for the future?',
    when: (answers) => answers.includeFuture
  },

  // 12. TESTIMONIALS
  {
    type: 'input',
    name: 'testimonial',
    message: 'Client or user testimonial/quote (optional):',
  },

  // 13. LINKS & MEDIA
  {
    type: 'input',
    name: 'demoLink',
    message: 'Live Demo Link:',
  },
  {
    type: 'input',
    name: 'githubLink',
    message: 'GitHub Repository Link:',
  },
  {
    type: 'input',
    name: 'otherLinks',
    message: 'Other links (portfolio, video demo, etc.):',
  }
];

inquirer.prompt(questions).then((answers) => {
  const caseStudy = generateCaseStudy(answers);

  console.log(chalk.green.bold('\nPreview:\n'));
  console.log(chalk.gray('─'.repeat(80)));
  console.log(caseStudy);
  console.log(chalk.gray('─'.repeat(80)));

  inquirer.prompt([
    {
      type: 'confirm',
      name: 'save',
      message: 'Save this case study?',
      default: true
    }
  ]).then((confirmation) => {
    if (confirmation.save) {
      const filename = `case-study-${answers.projectName.toLowerCase().replace(/\s+/g, '-')}.md`;
      fs.writeFileSync(filename, caseStudy);
      console.log(chalk.green.bold(`\nCase study saved as ${filename}\n`));
    } else {
      console.log(chalk.yellow('\nCase study not saved.\n'));
    }
  });
});

function generateCaseStudy(answers) {
  const techList = answers.technologies
    ? answers.technologies.split(',').map(tech => `- ${tech.trim()}`).join('\n')
    : '- (Not specified)';
  
  const teamList = answers.teamMembers && answers.teamMembers.trim() !== ''
    ? answers.teamMembers.split(',').map(member => `- ${member.trim()}`).join('\n')
    : '- Solo project';

  let content = `# Case Study: ${answers.projectName}

## Overview

- Project Name: ${answers.projectName}
- Date Completed: ${answers.dateCompleted || 'N/A'}
- Client/Organization: ${answers.client || 'N/A'}
- Your Role: ${answers.yourRole || 'N/A'}
- Project Type: ${answers.projectType || 'N/A'}

Team Members:
${teamList}

---
`;

  // PROJECT GOALS (optional)
  if (answers.includeGoals && (answers.primaryGoals || answers.whyImportant)) {
    content += `
## Project Goals

${answers.primaryGoals || 'N/A'}

Why these goals mattered:
${answers.whyImportant || 'N/A'}

---
`;
  }

  // CHALLENGE
  content += `
## Challenge / Problem Statement

Main Challenge:
${answers.mainChallenge || 'No challenge description provided.'}

Tangible Issues:
${answers.tangibleIssues || 'N/A'}

Problem Type:
${answers.problemType || 'N/A'}

Constraints:
${answers.constraints || 'None specified'}

---
`;

  // SOLUTION
  content += `
## Solution / Approach

Proposed Solution:
${answers.proposedSolution || 'No solution description provided.'}

Alternative Solutions Considered:
${answers.alternativeSolutions || 'N/A'}

Requirements Gathering:
${answers.requirementsGathering || 'N/A'}

Design Process:
${answers.designProcess || 'N/A'}

### Technologies Used
${techList}

Why These Technologies:
${answers.whyTechnologies || 'N/A'}

---
`;

  // DESIGN & UX (optional)
  if (answers.includeDesign && (answers.uxDecisions || answers.accessibility || answers.designTools)) {
    content += `
## Design & User Experience

UX/UI Decisions:
${answers.uxDecisions || 'N/A'}

Accessibility:
${answers.accessibility || 'N/A'}

Design Tools:
${answers.designTools || 'N/A'}

---
`;
  }

  // IMPLEMENTATION
  content += `
## Implementation

Major Milestones:
${answers.majorSteps || 'N/A'}

Architecture:
${answers.architecture || 'N/A'}

Critical Features:
${answers.criticalFeatures || 'N/A'}

Blockers & Surprises:
${answers.blockers || 'None encountered'}

Testing & Validation:
${answers.testing || 'N/A'}

${answers.codeSnippet ? `Code Highlight:\n\`\`\`\n${answers.codeSnippet}\n\`\`\`\n` : ''}
---
`;

  // DEPLOYMENT & DEVOPS (optional)
  if (answers.includeDeployment && (answers.hostingPlatform || answers.cicd || answers.monitoring)) {
    content += `
## Deployment & DevOps

Hosting Platform:
${answers.hostingPlatform || 'N/A'}

CI/CD Pipeline:
${answers.cicd || 'N/A'}

Monitoring & Analytics:
${answers.monitoring || 'N/A'}

---
`;
  }

  // RESULTS & IMPACT
  content += `
## Results & Impact

Measurable Outcomes:
${answers.measurableOutcomes || 'N/A'}

Business Impact:
${answers.businessImpact || 'N/A'}

Before/After:
${answers.beforeAfter || 'N/A'}

User Feedback:
${answers.userFeedback || 'N/A'}

---
`;

  // VISUAL SHOWCASE (optional)
  if (answers.includeVisuals && answers.screenshotLinks) {
    const screenshots = answers.screenshotLinks.split(',').map(link => `- ${link.trim()}`).join('\n');
    content += `
## Visual Showcase

${screenshots}

---
`;
  }

  // KEY LEARNINGS
  content += `
## Key Learnings & Reflections

What I Learned:
${answers.learnings || 'N/A'}

What I'd Do Differently:
${answers.doDifferently || 'N/A'}

Skills Gained:
${answers.skillsGained || 'N/A'}

---
`;

  // FUTURE ENHANCEMENTS (optional)
  if (answers.includeFuture && (answers.futureFeatures || answers.scalability)) {
    content += `
## Future Enhancements

Planned Features:
${answers.futureFeatures || 'N/A'}

Scalability Considerations:
${answers.scalability || 'N/A'}

---
`;
  }

  // TESTIMONIALS
  if (answers.testimonial && answers.testimonial.trim() !== '') {
    content += `
## Testimonials

> "${answers.testimonial}"

---
`;
  }

  // LINKS & MEDIA
  content += `
## Links & Media

${answers.demoLink ? `- Live Demo: [View Project](${answers.demoLink})` : ''}
${answers.githubLink ? `- GitHub Repository: [View Code](${answers.githubLink})` : ''}
${answers.otherLinks ? `- Other: ${answers.otherLinks}` : ''}
${!answers.demoLink && !answers.githubLink && !answers.otherLinks ? '- (No links provided)' : ''}

---

*Generated with Professional Case Study Generator v2.0 by Kairo Collective*
`;

  return content;
}
