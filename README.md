# WheelingAround-V2

## About
Wheeling Around was created by Runsen Wu, Ben Kosa, and Leanna Nguyen as part of our CSE 493F Final Project. The original code is available on [UW Gitlab](https://gitlab.cs.washington.edu/leannami/cse493f-finalproject). Wheeling Around V2 will be my continuation of this project!

Wheeling Around is a multiplayer educational game aimed at educating and raising awareness about sidewalk inaccessibility in Seattle, featuring two controllers: a custom hardware input device, and a camera-based pose estimation system using the ML5.js PoseNet API to translate body movements into game inputs.

<img src="readmeimgs\WAStartScreen.png"></img> 

## Background Research
Accessibility within the city, particularly in terms of transportation, is something we don’t often think about, but it affects many people. Providing functional roads and public transportation access is essential for helping families secure better employment opportunities and improving their overall well-being. Additionally, accessible infrastructure is crucial for safety; sidewalks and well-maintained roads help prevent accidents and ensure safer travel for all. According to the [Seattle Department of Transportation](https://www.seattle.gov/transportation/projects-and-programs/programs/pedestrian-program/sidewalk-accessibility-guide), nearly 24% of streets lack sidewalks, with the issue being most prevalent in north and south Seattle as well as our industrial districts.


<img src="readmeimgs\RBG_1.png" width="30%"></img> 
<img src="readmeimgs\RBG_2.png" width="30%"></img> 
<img src="readmeimgs\RBG_3.png" width="30%"></img> 
<img src="readmeimgs\RBG_4.png" width="30%"></img> 
<img src="readmeimgs\RBG_5.png" width="30%"></img> 
<img src="readmeimgs\RBG_6.png" width="30%"></img> 

> Figure 1 contains screenshots from the [Sidewalk Assessment & Conditions StoryMap](https://arcg.is/Prf58), which was linked in the [Seattle Sidewalk Accessibility Guide](https://www.seattle.gov/transportation/projects-and-programs/programs/pedestrian-program/sidewalk-accessibility-guide#Equity) by the Seattle Department of Transportation (SDOT).

SDOT’s sidewalk condition assessment methodology uses current ADA guidance on wholistic sidewalk conditions, width, and cross slope, along with amount of sidewalk replacement, to score each inspected sidewalk with the ratings: Excellent, Good, Fair, Poor, and Very Poor. 
- More details of these ratings and SDOT’s methodology can be found on Page 5 of the [SDOT Sidewalk Condition Assessment Report](https://www.bing.com/ck/a?!&&p=818121fed6145010JmltdHM9MTcxNzExMzYwMCZpZ3VpZD0xYzUyNzczMi0zYTExLTY2ZmQtMGIwNS02MzQ1M2IzYzY3MTAmaW5zaWQ9NTIwOQ&ptn=3&ver=2&hsh=3&fclid=1c527732-3a11-66fd-0b05-63453b3c6710&psq=sdot+excellent+no+obstructions&u=a1aHR0cHM6Ly93d3cuc2VhdHRsZS5nb3YvRG9jdW1lbnRzL0RlcGFydG1lbnRzL1NET1QvQWJvdXQvU2lkZXdhbGtBc3Nlc3NFeGVjU3VtbWFyeV80XzZfMjAxOFI1LnBkZg&ntb=1).

## Hardware Controller
### Design Process
<img src="readmeimgs\3dModeling_1.png" width="30%"></img> 
<img src="readmeimgs\3dModeling_2.png" width="30%"></img> 
<img src="readmeimgs\3dModeling_3.png" width="30%"></img> 

Designing the axe head in Blender, then adding the OLED cutout in TinkerCAD. Next, design the handle in TinkerCAD, ensuring it splits to secure the axe head and allows wires to pass through for connecting to the OLED. Additionally, include a cutout for the joystick.
 
<img src="readmeimgs\HD_1.jpg" width="30%"></img> 
<img src="readmeimgs\HD_2.jpg" width="30%"></img> 
<img src="readmeimgs\HD_3.png" width="30%"></img> 

Print the 3D model of the controller and assemble the circuit inside to complete it. The circuit diagram in Fritzing is included above.

<img src="readmeimgs\FHD_1.jpg" width="30%"></img> 
<img src="readmeimgs\FHD_2.jpg" width="30%"></img> 
<img src="readmeimgs\FHD_3.jpg" width="30%"></img> 
