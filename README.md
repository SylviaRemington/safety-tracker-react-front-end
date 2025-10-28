# Safety Tracker React Front End

<hr>

## Logo
<img width="611" height="572" alt="Screenshot 2025-10-18 at 4 59 50 AM" src="https://github.com/user-attachments/assets/52ff486f-75cb-4e9b-942f-fdda15bad912" />

<hr>

## Inspiration - Why I built It
**Safety Tracker** <br>
This project is called Safety Tracker. It is designed for individuals impacted by domestic abuse who want a private and secure way to document their daily experiences. The app will let users create, view, update, and delete journal entries (called "Daily Check-Ins") tied to their own account, ensuring only they can access their information. Each entry includes details such as events, categories for what occurred, and the safety level the user experienced.

As a stretch goal for this project, I'd like to create a key feature: a chart or visualization tool that reveals monthly patterns using percentages, which would enable users to better understand their experiences over time. In addition, if needed, I'd like the app to be able to generate or download a clear record (CSV file or similar) for both personal reflection or legal use (e.g., they can download a record of their experiences over a month and have a percentage of the days they experienced abuse to bring to a lawyer's office if they need to go to court to get a restraining order).

I would like this project to serve a meaningful purpose and help survivors make the choice to leave a toxic situation. In addition, I would like this app to have the ability to track the situation with real-world examples and journal entries. Ultimately, I would like this app to track patterns in a personal journal format over time. I also would like this app to have features which prioritize privacy, safety, and getting to a healthier place. <br>

<hr>

<img width="1514" height="927" alt="homepage" src="https://github.com/user-attachments/assets/12edaf34-0995-4cbf-8c33-5ca713d9cb66" />

<img width="350" alt="checkin best" src="https://github.com/user-attachments/assets/842fb783-8844-400b-be8c-6fa49062b4ae" />
<img width="335" alt="story best" src="https://github.com/user-attachments/assets/06cd5b8c-6a75-4973-8e8d-d2c2a14f4051" />
<!-- <img width="315" alt="authors best" src="https://github.com/user-attachments/assets/702b0ea2-019f-4cf8-9a76-63b8067b898a" /> -->
<img width="500" alt="register best" src="https://github.com/user-attachments/assets/f413ba50-c30c-4354-9e32-ccbbdb29ac25" />
<img width="462" alt="login best" src="https://github.com/user-attachments/assets/7775ba3f-55f0-4097-bc67-dc4f41889eb8" />
<img width="300" alt="emergency best" src="https://github.com/user-attachments/assets/d8f4ce7d-c27b-49b7-8986-55b93cc266bf" />
<img width="353" alt="Wellness Tips" src="https://github.com/user-attachments/assets/293ae5fe-afe3-4546-b5c6-1dc4ad3c7e9c" />

<hr>

## Link to:
- Back End Github Repo: https://github.com/SylviaRemington/safety-tracker-django-back-end <br>
- Front End Github Repo: https://github.com/SylviaRemington/safety-tracker-react-front-end <br>
- Trello Planning Materials & Excalidraw Wireframes & Lucid ERDs (Planning Materials) <br> https://app.excalidraw.com/l/ArZSbb1GP9u/6bZiYhm3CCr <br>
- Deployed App <br>

<hr>

## Tech Stack

**Backend**
- Python - the programming language I'm using
- Django - the web framework I'm using
- Django REST framework - the api framework
- PostgreSQL - the database I'm using
- Postman - for testing
- JWT authentication - for security & authentication

**Frontend**
- Javascript - Programming language I'm using
- React - User interface library/framework
- React Router DOM - Navigation library
- Vite - the build tool using
- Axios - HTTP client / API client
- CSS - Styling

<hr>

## Features - What It Can Do

**User Account Management:**
- User can create a secure account with username and password.
- User can log in and log out with appropriate authentication so that journal entries are private, and to ensure safety.
- Only the user can see their personal information.
  
**Daily Check-Ins (Journal Entries):**
- User can create private journal entries aka "Daily Check-Ins" about their daily experiences, so they can see patterns over time.
- User can track what type of day they had (Challenging, Normal, or Good).
- User can record how relaxed they felt each day.
- User can choose categories for what happened (Physical Abuse, Verbal Abuse, Emotional Abuse, etc.).
- Rate how intense their partner's reaction was (1-10 scale).
- Write down what they did to cope and how well it worked.
- The user can edit or delete their check-ins anytime.
- The user can search through their check-ins by title or description or descriptive word.
  
**Story Sharing:**
- The user can share their experiences with other users to help them feel less alone.
- The user can read stories from other people who understand what the user is going through since they have experienced it as well.
- Create, edit, and delete their own stories
- View stories by different authors

**Authors Page:**
- Browse all authors who have shared stories
- Find authors whose stories you really liked
- Read more stories from specific authors
- See how many stories each author has shared

**Wellness Tips:** **...upcoming!...** <br>
- Coming soon - This section will provide helpful wellness and self-care tips **...upcoming!...**

**Emergency Resources:**
- Quick access to emergency phone numbers
- Local and online support resources
- Safety planning information
- Crisis hotline numbers
  
**Pattern Tracking:** (This is part of my next steps.) **...upcoming!...**
- The user will be able to see percentages of their day_types over time. **...upcoming!...**
- View patterns of their daily experiences. **...upcoming!...**
- Track trends to better understand the user's situation. **...upcoming!...**
  
**Privacy & Security:**
- All of the user's personal "Daily Check-Ins" are completely private.
- Only the user can see their own data.
- Secure login system will protect the user's information.

<hr>

## Attributions/Resources <br>
**Images:**
- **Blue watercolor background image** <br> https://pixabay.com/photos/watercolor-background-design-paper-795161/
- **Pink watercolor background image** <br> https://www.pexels.com/photo/magenta-abstract-background-7233364/
- **Logo image** - Wrote my ideas down for how I would like the image to look with a lady's face looking upwards hopefully with a heart around her and have the main color be purple. I chose purple due to that being the "official color" for Domestic Violence Awareness. After I wrote all this down, I asked ChatGPT to design the logo. If I had more time, I would design it myself.

**Libraries/Frameworks:**
- React - reactjs.org
- Django - djangoproject.com
- Axios - axios-http.com

**Other Resources:**
- General Assembly Canva - review of python and django lessons
- Udemy class - 100 Days of Code: The Complete Python Pro Bootcamp - I started taking this class to better understand Python.
- Design Inspiration for the gradient CSS and the way the journal was set up found at: **https://codepen.io/danielhannih/pen/dyLNwjy** . However, the code was too complex and advanced currently for me, so I tried to replicate the gradient part of what they had with my knowledge of CSS. <br>

<hr>

## My Planning Process - screenshots of wireframes & tree set ups, etc. <br>
**Database Structure / How My Data Is Organized / How it all works together ERD style/format**

**User:** <br>
- User ID, Username, Email, Password, Date Created <br>
- Connects to: Check-In (one user can have many check-ins), Story (one user can have many stories)

**Check-In:** <br>
- Check-In ID, User ID (connects to User), Title, Description, Day Type, Relaxed Today, Category, Reaction Level, Coping Action, Effectiveness, Date Created <br>
- Connects to: User (each check-in belongs to one user)

**Story:** <br>
- Story ID, User ID (connects to User), Author ID (connects to Author), Title, Content, Date Created <br>
- Connects to: User (each story belongs to one user), Author (each story belongs to one author)

**Author:** <br>
- Author ID, Name <br>
- Connects to: Story (one author can have many stories)

<br>

## **BACKEND TREE FILE STRUCTURE**

<img width="701" height="1006" alt="backend file structure 1" src="https://github.com/user-attachments/assets/a6799083-319f-431b-a87f-6b15345b5ac5" />
<img width="690" height="756" alt="backend file structure 2" src="https://github.com/user-attachments/assets/9fe3ce46-e041-47b8-9813-cdae60bcdd0d" />


<br>

## **FRONTEND TREE FILE STRUCTURE**
- 822 directories, 7520 files --taking off node modules and the following with this command in terminal: <br> tree -I "node_modules|.git|package-lock.json|dist|build" -L 3
<img width="1091" height="1002" alt="frontend tree" src="https://github.com/user-attachments/assets/541c23bd-4d59-412a-847f-ff0c52cc5b48" />

- tree -I "node_modules|.git|package-lock.json|dist|build" -L 4
- 24 directories, 42 files
<img width="1225" height="988" alt="frontend 4 deep1" src="https://github.com/user-attachments/assets/88df47a5-f5d3-4cb7-8342-009444550891" />
<img width="1185" height="422" alt="frontend 4 deep2" src="https://github.com/user-attachments/assets/69e966c3-1c1d-4a42-941c-3f68d7870035" />

## Initial Excalidraw / Initial Planning
![a Project 4 Proposal 2nd Version - Screenshot 2025-10-14 at 9 56 40 AM copy](https://github.com/user-attachments/assets/31fa5623-3809-4173-b4ef-819ce0e65d16)


<br>

<hr>

## Future Enhancements / Next Steps
- **Patterns / Graphs Functionality** **(See Stretch Goals Below)**
- **Self Care / Calming Actions / Wellbeing Tips** - Creating a static page with different somatic tools/tips a user can do/use to calm themselves after what has happened so that they can think clearly and take more empowering steps.
- **Comments** - The ability for users to comment on eachother's stories and leave encouraging messages.<br>

## Stretch Goals 🚀
**To Create Count Functions & Filter Functions so that these functions can calculate percentages from the Check_Ins page:** <br><br>
Day Type Count will be the main thing I want to create/track to show the overall pattern of the user's daily experiences. It will be the most helpful thing for the user to understand their situation, have more awareness, and get out of denial of the situation.

**Day Type Count Function:** <br>
- Looks at the user's day_type field (Challenging Day, Normal Day, Good Day)
- Counts how many of each the user has
- Shows: "60% Challenging Days, 30% Normal Days, 10% Good Days" <br>

**Category Count Function:**
- Looks at the user's category field (Physical Abuse, Verbal Abuse, Emotional Abuse, etc.)
- Counts how many of each the user has
- Shows: "40% Verbal Abuse, 30% Emotional Abuse, 20% Physical Abuse, 10% Other" <br>

**All Time Count Function:**
- Create a filter where it looks at ALL of the user's check-ins (with no date limit)
- This would work with the Day Type function
- It would show something like the following: "Based on 25 total check-ins, percentages are as follows... " <br>

**Monthly Filter Function:**
- Create a filter where it looks at the last 30 days or the last month.
- This also would work with the Day Type function
- It would show something like the following: "This month, the percentages are as follows..." <br><br>


<hr>


## Ahas / Additional Awareness - What I Learned
- **Deleting A Commit** - Learned how to delete a commit via (1) Looking up the commit number in git log, (2) Making sure it was the correct commit with git checkout a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0, (3) Going back into the main branch where my repo and commit were located, (4) Doing a hard reset to completely delete the commit (since that is where all the problems were arising) with git reset --hard HEAD~1, (5) Pushing this change through via git push origin main --force. Grateful to have learned this. There is also the ability to do a "soft" reset as well. Since I am working solo on this project, I double checked everything and then proceeded. If I were in a team, my actions would have taken into account other team members and I wouldn't have done it this way. <br><br> **Where the mistake occurred & how I corrected it:** After registering the author model, I created a foreign key and migrated it without deleting the database ahead of time & that messed all the functionality up. I tried to fix it on my own; however, best scenario after attempting this for a while was to delete the foreign key commit and go back to where I was before that. That occurred on October 16th 2025, right after I registered the author model. After that, I went through postman and all functionality to make sure it was working again before I proceeded forward (thus all the notes after that to check on functionality). <br>

<br>

- **Django Backend Simplicity In the Repetition** - Appreciate the simplicity of Django back end: e.g. where you create the project, you create the app, & add it to installed apps. And then within the app, you follow basic steps for every app: create the model/makemigrations/migrate, register it in admin.py, create serializer, create the functions in views.py, create the path in urls.py in both the app and the project, and then test it. Additionally, the first app you typically create is the Authorization which entails a bit more with creating a superuser & serializer; however, all in all, it repeats itself and makes it super simple. Additionally, if there are interrelated items, you'll need to create foreign keys as well. <br>

<br>

- **Order of Installed Apps** - Researched this and learned that the common Django best practices for INSTALLED_APPS order is: **(1)Django built-in apps** first, **(2)then third party apps** like **corsheaders** & **rest_framework**, and **(3)then custom apps** go last to avoid overriding Django's defaults.

<br>

<hr>
