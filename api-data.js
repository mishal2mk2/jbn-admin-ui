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

const addMaterialFile = {
  item: [
    { item_id: "123", quantity: 2, subTotal: 222 },
    { item_id: "124", quantity: 2, subTotal: 222 },
    //more items
  ],
  grossTotal:1234,
  isApproved:false,
};

const estimateMaterial = {
    estimatedDaysOfCompletion:12,
    notes:''
}
