const args = [ 'start' ];
const opts = { stdio: 'inherit', cwd: 'voter-backend', shell: true };
require('child_process').spawn('npm', args, opts);