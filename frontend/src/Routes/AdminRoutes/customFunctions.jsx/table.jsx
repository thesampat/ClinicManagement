const getHeadings = (sectionType) => {
  let main_head;
  let custom_head;
  switch (sectionType) {
    case 'receptionist':
      main_head = ['name', 'email', 'phone'];
      custom_head = ['name', 'email', 'phone'];
      break;

    case 'patients':
      main_head = ['firstName', 'mobile', 'patientStatus', 'location', 'primary', 'secondary', 'third', 'Patient_Type'];
      custom_head = ['Name', 'Phone', 'patient status', 'location', 'primary', 'secondary', 'teritery', 'type'];
      break;

    case 'consultant':
      main_head = ['name', 'phone', 'typesOfDoctor', 'location'];
      custom_head = ['Name', 'Phone', 'type', 'location'];
      break;

    case 'doctors':
      main_head = ['name', 'phone', 'typesOfDoctor', 'education'];
      custom_head = ['Name', 'Phone', 'type', 'degree'];
      break;

    case 'enquiry':
      main_head = ['name', 'number', 'reference', 'createdAt', 'createdTime'];
      custom_head = ['Name', 'number', 'reference', 'date', 'time'];
      break;

    case 'assistantDoctor':
      main_head = ['name', 'phone', 'typesOfDoctor', 'education'];
      custom_head = ['Name', 'Phone', 'type', 'Degree'];
      break;

    case 'nutrition':
      main_head = ['fullName', 'dateOfBirth', 'gender', 'bloodGroup'];
      custom_head = ['Name', 'DOB', 'Gender', 'Bood Group'];
      break;
    case 'feedback':
      main_head = ['FirstName', 'state', 'mobile', 'education'];
      custom_head = ['Name', 'State', 'Mobile', 'Education'];
      break;

    case 'prescription':
      main_head = ['firstName', 'surname', 'mobile'];
      custom_head = ['First Name', 'Last Name', 'Mobile'];
      break;
  }

  return { main: main_head, display: custom_head };
};

export { getHeadings };
