import type { PlopTypes } from "@turbo/gen";

export default function generator(plop: PlopTypes.NodePlopAPI): void {
  plop.setGenerator("reactgrad-app", {
    description: "Create a new ReactGrad-based app in apps/",
    prompts: [
      {
        type: "input",
        name: "name",
        message: "What is your new app name?",
        validate: (input) => input ? true : "App name is required",
      },
    ],
    actions: [
      // First, let's use a simple copy approach
      {
        type: "addMany",
        destination: "apps/{{kebabCase name}}",
        templateFiles: "apps/reactgrad-csr/**",
        base: "apps/reactgrad-csr",
        globOptions: {
          dot: true, // Include dotfiles
          ignore: [
            '**/node_modules/**',
            '**/dist/**', 
            '**/.turbo/**',
            '**/build/**'
          ]
        },
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
      }
    ],
  });
}
