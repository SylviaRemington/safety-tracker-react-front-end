# Safety Tracker React Front End

## Logo
<img width="611" height="572" alt="Screenshot 2025-10-18 at 4 59 50 AM" src="https://github.com/user-attachments/assets/52ff486f-75cb-4e9b-942f-fdda15bad912" />

## Link to:
- Back End Github Repo: https://github.com/SylviaRemington/safety-tracker-django-back-end
- View Site: Front End Repo Link - https://github.com/SylviaRemington/safety-tracker-react-front-end
- Trello Planning Materials & Excalidraw Wireframes & Lucid ERDs (Planning Materials) - https://app.excalidraw.com/l/ArZSbb1GP9u/6bZiYhm3CCr
- Deployed App

## Information/Inspiration

## Features

## Tech Stack

## Attributions/Resources

## Rough Drafts - screenshots of wireframes & tree set ups

## Future Enhancements / Next Steps
- **Patterns / Graphs Functionality** **(See Stretch Goals Below)**
- **Self Care / Calming Actions / Wellbeing Tips** - Creating a static page with different somatic tools/tips a user can do/use to calm themselves after what has happened so that they can think clearly and take more empowering steps.

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

## Ahas / Additional Awareness
- **Deleting A Commit** - Learned how to delete a commit via (1) Looking up the commit number in git log, (2) Making sure it was the correct commit with git checkout a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0, (3) Going back into the main branch where my repo and commit were located, (4) Doing a hard reset to completely delete the commit (since that is where all the problems were arising) with git reset --hard HEAD~1, (5) Pushing this change through via git push origin main --force. Grateful to have learned this. There is also the ability to do a "soft" reset as well. Since I am working solo on this project, I double checked everything and then proceeded. If I were in a team, my actions would have taken into account other team members and I wouldn't have done it this way. <br><br> **Where the mistake occurred & how I corrected it:** After registering the author model, I created a foreign key and migrated it without deleting the database ahead of time & that messed all the functionality up. I tried to fix it on my own; however, best scenario after attempting this for a while was to delete the foreign key commit and go back to where I was before that. That occurred on October 16th 2025, right after I registered the author model. After that, I went through postman and all functionality to make sure it was working again before I proceeded forward (thus all the notes after that to check on functionality). <br>

<br>

- **Django Backend Simplicity In the Repetition** - Appreciate the simplicity of Django back end: e.g. where you create the project, you create the app, & add it to installed apps. And then within the app, you follow basic steps for every app: create the model/makemigrations/migrate, register it in admin.py, create serializer, create the functions in views.py, create the path in urls.py in both the app and the project, and then test it. Additionally, the first app you typically create is the Authorization which entails a bit more with creating a superuser & serializer; however, all in all, it repeats itself and makes it super simple. Additionally, if there are interrelated items, you'll need to create foreign keys as well. <br>

<br>

- **Order of Installed Apps** - Researched this and learned that the common Django best practices for INSTALLED_APPS order is: **(1)Django built-in apps** first, **(2)then third party apps** like **corsheaders** & **rest_framework**, and **(3)then custom apps** go last to avoid overriding Django's defaults.
