# Product GHG emission+

## Project Description

Product GHG emission+ tool enables users to develop inventories of GHG emissions related to their products. The results are obtained using emission factors (EF), GHG emissions per each activity/input, multiplied by the activity or data input. The EFs, which cover multiple GHGs and are expressed in CO2 equivalents (CO2e), are gathered from life cycle databases, government agencies, and academic literature.

## Live Website

Check out the live version of the website [here](https://lca-tool.link).

## Features

- Authentication with Google and Microsoft
- Adding data to database
- Can add descriptions and files to your datas
- Show total sums
- Show data in report and pritn as PDF
- Sort in created date or GHG total emission
- Visualize data with pie chart and sankey diagram
- Can create apikey for using server side functionality
- Responsive (can be used any screen size)

## Technologies used

### Frontend

- React.js
- Redux
- MUI
- React-google-charts

### Backend

- Node.js
- Express.js
- MongoDB
- Swagger UI

## Deploying
- AWS
- Ubuntu
- Nginx
- pm2

## Useage

First you need to sign in with Google or Microsoft to authenticate and navigate different sections. Then you can navigate in different sections usgin navbar. 
- In "ADD NEW CALCULATION" section you can pick which form you want and create data by filling out the form.
- In "CALCULATIONS" section you can see all data you added. Also can update, delete or sort datas in created date or GHG total emission. Clicing data you navigate page where you can see more about the clicked data with report and charts. Also can update, delete or download as PDF the data.
- IN "APIKEY" section you can create apikey or can see created apikey.
After all you can logout manually or it will logout after 1h automatically.

## API Documentation

You can find API documentation from [here](https://lca-tool.link/api-docs/)