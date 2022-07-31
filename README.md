### KSW_2022_Winter_Program

# ⚡2022 Purdue IITP by Peter Parking⚡
<hr>

📑 *Project Title*
        
    Dynamic Parking Slot Allocation Based on IoT using LED lights differently to notify the information of parking slot for driver

📅 *Project Period*

    01-01-2022(SAT) ~ 02-26-2022(SAT)

🧖🏻‍♀️ *Problem Statement*
    
    Parking has always been a problem in crowded city as it caused individuals to lose time due to unnecessary searching of parking spots. Finding a parking spot has always been an issue for visitors due to limited parking spots Therefore, by using Peter Parking website which is a smart parking system based on IoT (Internet of Things). For example, The city has a big event like a football game, Visitors cannot park into their spots because of overflowing vehicles, even though the allocated spots for student, principal, and faculty are vacant. This case study will provide a solution that will allow better time management and space scarcity for users.

📖 *Considerations*

    🥕Software : 
    - Process nodes and function in the Node-Red to operate system. 
    - Divide the way people access the web page between administrator and user(driver).

    🥕Hardware :
    - Connect a lot of the modules(total 17) to system efficiently. 

💡 *Novelty*

    1. Use RGB LED light to indicate parking spot's information!
       => In existing many parking systems just inform driver whether the parking spot is available.
      Once a parking spot is allocated, this spot cannot be changed like a constant. We do not want this system.
      Our system will notify to drivers more various information using color of light to allocate parking spot dynamically
      The color of light(RGB LED Module) indicate parking spot by using a different color for each spot, Drivers will know who each slot is for.
      

🏛 *System Overview*

   ![figure2](https://user-images.githubusercontent.com/67006945/154104756-2444dc44-d852-4270-9574-9bce327d2c28.png)
    
    1. Access to administrator web page.

    2. The administrator sets each parking spot color which is RGB LED light to indicate parking spot who is for.

    3. IR Infrared Sensor module detects the presence of a vehicle.

    4. Based on these measured values, the System renews the User's web page

    5. Displays the information about the parking lot on LCD Display module.

![image](https://user-images.githubusercontent.com/67006945/154127868-5ab28a22-71df-4d40-8e55-b6d291c9ca8d.png)

    - Hardware
    : The hardware design will show for what the system uses and how these hardware modules are connected to realize. For that, The hardware consist of an Arduino Uno, 8 IR Infrared sensor module, 8 RGB LED light module, 16*2 LCD Display module to operate the parking lot system. In the hardware section, Hardware will process value which is measured by each module and send to software or data set by administrator will be sent to hardware through Node-Red.

    - Software
    : The main software is Node-Red. The Node-Red is a programming tool for wiring together hardware devices. Between hardware and software, data will be converted to serial message to communicate. And for more convenience, the system will be run on the web browser. Because of this, administrator and users can easily manage or access the system.
    In the administrator web page, an administrator initializes and changes the information about the parking lot. And this data is displayed on the user's web page and user can notice whether there exist an available empty parking spot and can park that spot.
 
🖥️ *Environment Setting*

    ✔️macOS Big Sur
    
    ✔️Arduino IDE version 1.8.19 
    
    ✔️Node-Red version 2.1.6
    
    ✔️Arduio Uno 
  
📤 *Installation*

    $ git clone https://github.com/MINJILEE-PURDUE/KSW_2022_Winter_Program.git
    $ cd Peter_Parking

👨‍👩‍👧‍👧 *Collaborator*
     
    👩‍💻Jiwoo Park
       -Chungnam National Univeristy
       -Major in Computer Science Engineering
       -jiwoo.park2892@gmail.com
       
    🎅🏻Junkyun Woo
       -Chungnam National University
       -Major in Computer Science Engineering
       -wjk6044@naver.com
      
    👰Byeonggyu Kim
       -Chungnam National University
       -Major in Korean Language and Literature
       -lucy159753@naver.com
       
    👩‍🚀Andy Lin
       -Purdue University
       -Major in Major in CIT and Minor in Organizational Leadership
       -Andylin321123@gmail.com
    
    👨🏻‍🦱Hazza Alkalbani
       -Purdue University
       -Major in Cybersecurity
       -halkalba@purdue.edu
