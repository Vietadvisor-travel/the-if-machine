import { Config } from '@remotion/cli/config';
// Claude's container cannot download Remotion's browser (remotion.media is not reachable): use the pre-installed Chromium headless shell.
const SHELL = '/opt/pw-browsers/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
import fs from 'fs';
if (fs.existsSync(SHELL)) Config.setBrowserExecutable(SHELL);
Config.setVideoImageFormat('jpeg');
Config.setJpegQuality(92);
Config.setConcurrency(4);
