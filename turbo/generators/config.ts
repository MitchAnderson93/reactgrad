import type { PlopTypes } from "@turbo/gen";

<<<<<<< HEAD
// Define the answers interface
interface GeneratorAnswers {
  name: string;
}

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("reactgrad-csr", {
    description: "Create a new client-side ReactGrad-based app in apps/",
=======
export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("reactgrad-app", {
    description: "Create a new ReactGrad-based app in apps/",
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your new app name?",
        validate: (input) => input ? true : "App name is required",
      },
    ],
    actions: [
<<<<<<< HEAD
      // Copy all files from the template
      {
        type: "addMany",
        destination: "{{turbo.paths.root}}/apps/{{kebabCase name}}",
        templateFiles: "{{turbo.paths.root}}/apps/reactgrad-csr/**/*",
        base: "{{turbo.paths.root}}/apps/reactgrad-csr",
        globOptions: {
          dot: true, // Include dotfiles like .gitignore
=======
      // First, let's use a simple copy approach
      {
        type: "addMany",
        destination: "apps/{{kebabCase name}}",
        templateFiles: "apps/reactgrad-csr/**",
        base: "apps/reactgrad-csr",
        globOptions: {
          dot: true, // Include dotfiles
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
          ignore: [
            '**/node_modules/**',
            '**/dist/**', 
            '**/.turbo/**',
            '**/build/**'
          ]
        },
<<<<<<< HEAD
        abortOnFail: false,
      },
      // Custom action to modify package.json
      function (answers: GeneratorAnswers) {
        const fs = require('fs');
        const path = require('path');
        
        const appName = plop.getHelper('kebabCase')(answers.name);
        const packageJsonPath = path.join(process.cwd(), 'apps', appName, 'package.json');
        
        try {
          if (fs.existsSync(packageJsonPath)) {
            const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
            packageJson.name = appName;
            fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
            return `✅ Updated package.json name to "${appName}"`;
          } else {
            return `❌ package.json not found at ${packageJsonPath}`;
          }
        } catch (error) {
          return `❌ Error updating package.json: ${error.message}`;
        }
      },
      // Custom action to update any other references
      function (answers: GeneratorAnswers) {
        const fs = require('fs');
        const path = require('path');
        
        const appName = plop.getHelper('kebabCase')(answers.name);
        const appDir = path.join(process.cwd(), 'apps', appName);
        
        // Update index.html title if it exists
        const indexHtmlPath = path.join(appDir, 'index.html');
        if (fs.existsSync(indexHtmlPath)) {
          let indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');
          indexHtml = indexHtml.replace(/<title>.*<\/title>/, `<title>${appName}</title>`);
          fs.writeFileSync(indexHtmlPath, indexHtml);
          return `✅ Updated index.html title to "${appName}"`;
        }
        
        return `✅ App "${appName}" created successfully`;
      },
      // Install dependencies
      function (answers: GeneratorAnswers) {
        const { execSync } = require('child_process');
        const appName = plop.getHelper('kebabCase')(answers.name);
        
        try {
          console.log(`\n📦 Installing dependencies for ${appName}...`);
          execSync('pnpm install', { 
            stdio: 'inherit',
            cwd: process.cwd() // Run from monorepo root
          });
          return `✅ Dependencies installed successfully`;
        } catch (error) {
          return `❌ Failed to install dependencies: ${error.message}`;
        }
      },
      // Final success message with next steps
      function (answers: GeneratorAnswers) {
        const appName = plop.getHelper('kebabCase')(answers.name);
        return `
🎉 Successfully created "${appName}"!

Next steps:
  cd apps/${appName}
  pnpm dev

Your new ReactGrad app is ready to go! 🚀
        `.trim();
=======
        abortOnFail: false, // Don't abort on single file failures
      },
      // Custom action to modify package.json
      function (answers) {
        const fs = require('fs');
        const path = require('path');
        
        const packageJsonPath = path.join(process.cwd(), 'apps', plop.getHelper('kebabCase')(answers.name), 'package.json');
        
        if (fs.existsSync(packageJsonPath)) {
          const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
          packageJson.name = plop.getHelper('kebabCase')(answers.name);
          fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
          return `Updated package.json name to "${packageJson.name}"`;
        } else {
          return `Warning: package.json not found at ${packageJsonPath}`;
        }
>>>>>>> 7354c7f (WIP:DEV - Recent updates supporting multiple themes  (#2))
      }
    ],
  });
}
