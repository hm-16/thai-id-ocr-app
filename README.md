# Thai ID Card OCR App
It is an OCR (Optical Character Recognition) App that can recognize Thai id cards and get the required information. Also, It saves this information for retrieval later. The tech stack used for the App is Node.js , React.js , Express.js and MongoDB . I used the Google Vision API for extracting the text from the uploaded image of Thai National Id .
## Functionalities Implemented 

 - **OCR operation** : It is present on the landing route('/') of the app. Intended for extracting the information from the uploaded ID card . And once the information is extracted user can save that info to database .
 - **Fetch operation** : Present on '/fetch' route , where user can fetch the records using some filters such as Id number , Name , Last Name , DOB (= or >= or <= or > or <) similarly for Date of Issue and Expiry .
 - **Update Operation** : On the route : '/update' there is functionality to first get the data using ID card number and then update the details of that ID card into the database .
 - **Delete Operation** : On '/delete' route user can delete the particular record , if it exists in database , using the ID card number .
 - **Regex Logic** : Now from the text that is extracted by the google vision API , I wanted my relevant information to be extracted , for that I created a logic in using Regex to scrap the relevant information from extracted text .

## To run app on local system
### Prerequisites

 - Latest Version of Node.js and npm .
 - MongoDB Atlas Account
 - Google Vision API Key
 ### Steps
 
 - Clone this repository to your pc
 - Open terminal in backend folder run the command : 
 `npm install`
 - Also do the the same in frontend folder present inside backend folder.
 - Then in backend create a `.env` file and in that file create a key by name `MONGO_URI` and paste your mongoDB connection string into it , like as shown `MONGO_URI=<your-connection-string>`.
 - Also download the `.json` API key file of Google Vision API inside the backend folder . Now , in file `ocr.js` present in directory `backend\helpers\ocr.js` , change the field `keyFilename` to the name of your downloaded json key file.
 - Now in `frontend` folder run command `npm run build` and wait for it to complete.
 - Once the build is finished inside `backend` run `npm start` , then the server will start on port 3001 . Go to your browser and type `http://localhost:3001/` , you will see the app running there .
 ## Deployed Site Link
 https://zany-tan-lovebird-yoke.cyclic.app/
