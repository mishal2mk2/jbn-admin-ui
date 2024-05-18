// Create Project
const CreateNewProject = {
  client: {
    name: "sample name",
    mob: 1321,
    add: {
      city: "malappuram",
      location: "kottakkal",
      link: "",
    },
  },
  notes: "",
  descriptions: "",
  orderStatus: 1,
};

const addDrawingFile = {
  file: File,
  notes: "",
};

const estimateMaterial = {
  item: [
    { item_id: "123", quantity: 2, subTotal: 222 },
    { item_id: "124", quantity: 2, subTotal: 222 },
    //more items
  ],
  //estimate price of order
  grossTotal: 1234,
  isApproved: false,
  //estimate time of completion
  estimatedDaysOfCompletion: 12,
  notes: "",
};

const awaitingConfirmation = {
  transactionId: "",
  dateOfTransaction: Date,
};

const estimateMaterialArrival = {
  estimateDateOfArrival: Date,
  priority: "High" || "Low" || "Critical" || "Medium",
};

const Production = {
  productionStatus: [
    {
      status: 1,
      isStarted: true,
      completed: 10, //in percentage should be less than 100 and not less than 0
    },
    {
      status: 2,
      isStarted: true,
      completed: 5, //in percentage should be less than 100 and not less than 0
    },
    {
      status: 3,
      isStarted: false,
      completed: 0, //in percentage should be less than 100 and not less than 0
    },
    {
      status: 4,
      isStarted: false,
      completed: 0, //in percentage should be less than 100 and not less than 0
    },
    {
      status: 5,
      isStarted: false,
      completed: 0, //in percentage should be less than 100 and not less than 0
    },
    {
      status: 6,
      isStarted: false,
      completed: 0, //in percentage should be less than 100 and not less than 0
    },
  ],
  currentStatus: 2, // latest started status
  isProductionComplete: false,
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
