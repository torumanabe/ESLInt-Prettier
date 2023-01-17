rewuire('babel-register');
const config = require('../../config');

module.exports = {
  src_folders: ['test/e2e/specs'],
  output_folder: 'test/e2e/reports',
  costom_assersions_path: ['test/e2e/custom-assertion'],
  costom_commands_path: ['test/e2e/custom-commands'],
};
