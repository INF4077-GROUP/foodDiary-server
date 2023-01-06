1. Get the number of time the user when to bowel per day

2. When creating food of a dayling habit, make sure the user upload the image of all given food
   - Upload the image of all given food
   - The originale name of the food should be the food's name, and the filename of the food should be unique
   - In all food's objects return the filename of the food
     Example: "foods": [
     {
     "name": "viande",
     "eatingNb": 2,
     "image": photo-eru.png
     }
     ]
3. Base on all foods user have ate and all sicks that the user have to get recommendation of food for the next 7 daysHabit
   - foods and sicks per day
   - calculate frequency for being sick after having eaten food
   - create CSV file and send to the frontend
