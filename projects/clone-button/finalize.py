from pathlib import Path
import subprocess
root=Path(__file__).resolve().parent
subprocess.run(['ffmpeg','-y','-i',str(root/'clone_button_silent.mp4'),'-i',str(root/'soundtrack.wav'),'-map','0:v','-map','1:a','-c:v','copy','-c:a','aac','-b:a','192k','-shortest','-movflags','+faststart',str(root/'clone_button.mp4')],check=True)
