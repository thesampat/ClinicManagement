const getHeadings = (sectionType) => {
  let main_head;
  let custom_head;
  switch (sectionType) {
    case 'receptionist':
      main_head = ['name', 'email', 'phone'];
      custom_head = ['name', 'email', 'phone'];
      break;

    case 'patients':
      main_head = ['firstName', 'mobile', 'patientStatus', 'location', 'primary', 'secondary', 'third', 'patientType'];
      custom_head = ['Name', 'Phone', 'patient status', 'location', 'primary', 'secondary', 'teritery', 'patient type'];
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
      main_head = ['name', 'number', 'reference', 'purposeOfEnquiry'];
      custom_head = ['Name', 'number', 'reference', 'purpose of entry'];
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
      main_head = ['FirstName', 'dateOfBirth', 'typesOfDoctor', 'education'];
      custom_head = ['Name', 'Phone', 'type', 'Degree'];
      break;
  }

  return { main: main_head, display: custom_head };
};

export { getHeadings };
