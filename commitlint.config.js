const config = { 
  extends: ['@commitlint/config-conventional'],
  ignores: [(message) => /^chore\(release\):\s\d+\.\d+\.\d+\s\[skip ci\]$/m.test(message)],
};

export default config;