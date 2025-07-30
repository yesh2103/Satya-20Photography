#!/usr/bin/env node

/**
 * Pre-deployment verification script for Satya Photography
 * Checks that all required files and configurations are in place
 */

const fs = require('fs');
const path = require('path');

const requiredFiles = [
  'package.json',
  'vite.config.ts',
  'tailwind.config.ts',
  'client/App.tsx',
  'client/pages/Index.tsx',
  'client/pages/Gallery.tsx',
  'client/pages/Contact.tsx',
  'client/pages/Login.tsx',
  'client/pages/Admin.tsx',
  'client/pages/Packages.tsx',
  'server/index.ts',
  'server/routes/contact.ts',
  'server/services/emailService.ts',
  'shared/types.ts',
  'database/schema.sql',
  'netlify/functions/api.ts',
  '.env.example',
  '.env.production.example',
  'DEPLOYMENT.md',
  'README.md'
];

const requiredEnvVars = [
  'VITE_SUPABASE_URL',
  'VITE_SUPABASE_ANON_KEY'
];

console.log('🔍 Satya Photography - Deployment Verification\n');

// Check required files
console.log('📁 Checking required files...');
let missingFiles = [];
requiredFiles.forEach(file => {
  if (!fs.existsSync(path.join(__dirname, '..', file))) {
    missingFiles.push(file);
  }
});

if (missingFiles.length > 0) {
  console.log('❌ Missing files:');
  missingFiles.forEach(file => console.log(`   - ${file}`));
} else {
  console.log('✅ All required files present');
}

// Check package.json scripts
console.log('\n📦 Checking package.json scripts...');
const packageJson = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'package.json'), 'utf8'));
const requiredScripts = ['dev', 'build', 'start', 'typecheck'];
let missingScripts = [];

requiredScripts.forEach(script => {
  if (!packageJson.scripts[script]) {
    missingScripts.push(script);
  }
});

if (missingScripts.length > 0) {
  console.log('❌ Missing scripts:');
  missingScripts.forEach(script => console.log(`   - ${script}`));
} else {
  console.log('✅ All required scripts present');
}

// Check dependencies
console.log('\n📚 Checking key dependencies...');
const requiredDeps = [
  '@supabase/supabase-js',
  'react',
  'react-router-dom',
  'express',
  'nodemailer',
  'zod'
];

let missingDeps = [];
requiredDeps.forEach(dep => {
  if (!packageJson.dependencies[dep] && !packageJson.devDependencies[dep]) {
    missingDeps.push(dep);
  }
});

if (missingDeps.length > 0) {
  console.log('❌ Missing dependencies:');
  missingDeps.forEach(dep => console.log(`   - ${dep}`));
} else {
  console.log('✅ All key dependencies present');
}

// Check environment variables (if .env exists)
console.log('\n🔧 Checking environment configuration...');
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  let missingEnvVars = [];
  
  requiredEnvVars.forEach(envVar => {
    if (!envContent.includes(envVar)) {
      missingEnvVars.push(envVar);
    }
  });

  if (missingEnvVars.length > 0) {
    console.log('⚠️  Missing environment variables in .env:');
    missingEnvVars.forEach(envVar => console.log(`   - ${envVar}`));
  } else {
    console.log('✅ Required environment variables configured');
  }
} else {
  console.log('⚠️  No .env file found (use .env.example as template)');
}

// Check database schema
console.log('\n🗄️  Checking database schema...');
const schemaPath = path.join(__dirname, '..', 'database', 'schema.sql');
if (fs.existsSync(schemaPath)) {
  const schemaContent = fs.readFileSync(schemaPath, 'utf8');
  const requiredTables = ['users', 'media', 'contact_form_submissions', 'packages'];
  let missingTables = [];
  
  requiredTables.forEach(table => {
    if (!schemaContent.includes(`CREATE TABLE ${table}`)) {
      missingTables.push(table);
    }
  });

  if (missingTables.length > 0) {
    console.log('❌ Missing database tables:');
    missingTables.forEach(table => console.log(`   - ${table}`));
  } else {
    console.log('✅ All required database tables defined');
  }
} else {
  console.log('❌ Database schema file not found');
}

// Check Netlify configuration
console.log('\n🌐 Checking Netlify configuration...');
const netlifyFunctionPath = path.join(__dirname, '..', 'netlify', 'functions', 'api.ts');
if (fs.existsSync(netlifyFunctionPath)) {
  console.log('✅ Netlify functions configured');
} else {
  console.log('❌ Netlify functions not configured');
}

// Summary
console.log('\n📊 Deployment Readiness Summary:');
const totalChecks = 6;
let passedChecks = 0;

if (missingFiles.length === 0) passedChecks++;
if (missingScripts.length === 0) passedChecks++;
if (missingDeps.length === 0) passedChecks++;
if (fs.existsSync(envPath)) passedChecks++;
if (fs.existsSync(schemaPath)) passedChecks++;
if (fs.existsSync(netlifyFunctionPath)) passedChecks++;

console.log(`${passedChecks}/${totalChecks} checks passed`);

if (passedChecks === totalChecks) {
  console.log('✅ Ready for deployment!');
  console.log('\n🚀 Next steps:');
  console.log('1. Set up Supabase project and apply schema');
  console.log('2. Configure environment variables in Netlify');
  console.log('3. Deploy to Netlify');
  console.log('4. Test all functionality');
  process.exit(0);
} else {
  console.log('❌ Please resolve issues above before deploying');
  process.exit(1);
}
