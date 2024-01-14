import subprocess
import sys
cmd1 = 'rm' + ' ' + sys.argv[1]
cmd2 = 'rm' + ' ' + sys.argv[2]
subprocess.call(cmd1, shell=True)
subprocess.call(cmd2, shell=True)
