// Create Project
const CreateNewProject = {
  client: {
    name: "sample name",
    mob: 1321,
    email:"dj@gmail.com",
    add: {
      city: "malappuram",
      location: "kottakkal",
      link: "google location link",
    },
  },
  notes: "",
  description: "",
};

const addDrawingFile = {
  isApproved:true,
  file: File,
  notes: "",
};

const estimateMaterial = {
  "item": [
    {
      "price":12344,
      "unitCalculated":"sqft",
      "name":"multiwood",
      "quantity": 5,
      "subTotal": 222
    },
    {
        "item_id":"6648ba487b301d8e8f5be47c",
      "price":45644,
      "unitCalculated":"cbcm",
      "name":"plywood",
      "quantity": 9,
      "subTotal": 3453
    }
  ],
  "grossTotal": 1234,
  "isApproved": false,
  "estimatedDaysOfCompletion": 12,
  "notes": ""
};

const awaitingConfirmation = {
  isApproved:true,
  id:"projectId",
  transactionId: "",
};

const estimateMaterialArrival = {
  estimateDateOfArrival: Date,
  priority: "High" || "Low" || "Critical" || "Medium",
};

const Production = {
  productionStatus: [
    {
        status:1,
        isStarted: true,
        completed: 10, //in percentage should be less than 100 and not less than 0
    },
    {
        status:2,
        isStarted: true,
        completed: 5, //in percentage should be less than 100 and not less than 0
    },
    {
        status:3,
        isStarted: false,
        completed: 0, //in percentage should be less than 100 and not less than 0
    },
    {
        status:4,
        isStarted: false,
        completed: 0, //in percentage should be less than 100 and not less than 0
    },
    {
        status:5,
        isStarted: false,
        completed: 0, //in percentage should be less than 100 and not less than 0
    },
    {
        status:6,
        isStarted: false,
        completed: 0, //in percentage should be less than 100 and not less than 0
    },
  ],
  currentStatus: 2,//latest started status
  isProductionComplete:false
};

const delivery = {
  driverNumber: 987654321,
  deliveryVehicleNumber: "KL11AD2234",
};

const installation = {
  uploadedImages: File,
  notes: "",
};

const awaitingService = {
  //no form it is just status
};

const service = {
  serviceReport: File,
  notes: "",
  closingReport: File,
};

const Closed = {
  //project successfully completed and closed
  //button to get closing report
};

const Cancelled = {
  //project cancelled
  //button to restart project
  //reason for cancellation
};

POST http://localhost:3000/project/add HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmM2ZmOTNhNDVjNmQ1NjIyNTg2ZjkiLCJ1c2VybmFtZSI6Im1pc2hhbCIsInBhc3N3b3JkIjoiJDJiJDEwJEhkeDlZb1ZVaVJ4TUVQVm1meGRoRC5Ea2JGSWRpSXlxNFFvbklEbUhGRTRKM0tKRnk2Zk1pIiwicm9sZSI6InVzZXIiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJfX3YiOjAsImlhdCI6MTcxNDM3OTg2MH0.VPOthOyUbb_-E1OvwaMtrCyQk7ItvOetsG1nq0sCvoo
Content-Type: application/json

{
    "client":{
        "name":"Dheraj",
        "mob":9072441214,
        "email":"dj@gmail.com",
        "add":{
            "city":"Calicut",
            "location":"Near GLP School",
            "link":"path/of/googlemaps"
        }
    },
    "notes":"heey",
    "description":"heey"
}

###

POST http://localhost:3000/project/list HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmM2ZmOTNhNDVjNmQ1NjIyNTg2ZjkiLCJ1c2VybmFtZSI6Im1pc2hhbCIsInBhc3N3b3JkIjoiJDJiJDEwJEhkeDlZb1ZVaVJ4TUVQVm1meGRoRC5Ea2JGSWRpSXlxNFFvbklEbUhGRTRKM0tKRnk2Zk1pIiwicm9sZSI6InVzZXIiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJfX3YiOjAsImlhdCI6MTcxNDM3OTg2MH0.VPOthOyUbb_-E1OvwaMtrCyQk7ItvOetsG1nq0sCvoo
Content-Type: application/json

{
}

###

POST http://localhost:3000/project/66473abbb351aeac5e55f453 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmM2ZmOTNhNDVjNmQ1NjIyNTg2ZjkiLCJ1c2VybmFtZSI6Im1pc2hhbCIsInBhc3N3b3JkIjoiJDJiJDEwJEhkeDlZb1ZVaVJ4TUVQVm1meGRoRC5Ea2JGSWRpSXlxNFFvbklEbUhGRTRKM0tKRnk2Zk1pIiwicm9sZSI6InVzZXIiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJfX3YiOjAsImlhdCI6MTcxNDM3OTg2MH0.VPOthOyUbb_-E1OvwaMtrCyQk7ItvOetsG1nq0sCvoo
Content-Type: application/json

{
}

###

POST http://localhost:3000/project/drawing-upload/:id HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmM2ZmOTNhNDVjNmQ1NjIyNTg2ZjkiLCJ1c2VybmFtZSI6Im1pc2hhbCIsInBhc3N3b3JkIjoiJDJiJDEwJEhkeDlZb1ZVaVJ4TUVQVm1meGRoRC5Ea2JGSWRpSXlxNFFvbklEbUhGRTRKM0tKRnk2Zk1pIiwicm9sZSI6InVzZXIiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJfX3YiOjAsImlhdCI6MTcxNDM3OTg2MH0.VPOthOyUbb_-E1OvwaMtrCyQk7ItvOetsG1nq0sCvoo
Content-Type: multipart/form-data

{
  "isApproved":true,
  "file": ,
  "notes": "",
}
###

POST http://localhost:3000/project/material-upload/66473ad8b351aeac5e55f457 HTTP/1.1
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjJmM2ZmOTNhNDVjNmQ1NjIyNTg2ZjkiLCJ1c2VybmFtZSI6Im1pc2hhbCIsInBhc3N3b3JkIjoiJDJiJDEwJEhkeDlZb1ZVaVJ4TUVQVm1meGRoRC5Ea2JGSWRpSXlxNFFvbklEbUhGRTRKM0tKRnk2Zk1pIiwicm9sZSI6InVzZXIiLCJjcmVhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJ1cGRhdGVkQXQiOiIyMDI0LTA0LTI5VDA2OjM2OjQxLjE5NloiLCJfX3YiOjAsImlhdCI6MTcxNDM3OTg2MH0.VPOthOyUbb_-E1OvwaMtrCyQk7ItvOetsG1nq0sCvoo
Content-Type: application/json

{
  "item": [
    {
        "item_id":"6648ba487b301d8e8f5be47b",
      "price":12344,
      "unitCalculated":"sqft",
      "name":"multiwood",
      "quantity": 5,
      "subTotal": 222
    },
    {
        "item_id":"6648ba487b301d8e8f5be47c",
      "price":45644,
      "unitCalculated":"cbcm",
      "name":"plywood",
      "quantity": 9,
      "subTotal": 3453
    }
  ],
  "grossTotal": 1234,
  "isApproved": true,
  "estimatedDaysOfCompletion": 12,
  "notes": ""
}
