var trac_nghiem_tinh_cach_ctrl = function ($scope, d3service, $timeout, $filter, $http, $uibModal, $log, $document) {
  /*1: 2 10: 4 18: 3 26: 4 34: 2 42: 3 50: 2 28 - 36: 29
    2: 2 11: 3 19: 2 27: 4 35: 3 43: 4 51: 2 37 - 45: 24
    3: 4 12: 3 20: 2 28: 4 36: 2 44: 2 52: 2 46 - 54: 21
    4: 4 13: 4 21: 4 29: 4 * 37: 4 45: 2 53: 3
    6: 4 14: 3 22: 4 30: 3 38: 4 * 46: 4 54: 2
    7: 0 15: 0 23: 3 31: 4 39: 4 47: 2 1 - 9: 18
    8: 4 16: 4 24: 2 32: 3 40: 3 48: 2 10 - 18: 28
    9: 2 17: 4 25: 4 33: 4 41: 2 49: 2 19 - 27: 29 */
  $scope.is_load_chart = false;
  $scope.danhsach_cauhoi = [{
    "code": "1 - 9",
    "value": [
      { number: 1, question: "Tôi có tính tự lập" },
      { number: 2, question: "Tôi suy nghĩ thực tế" },
      { number: 3, question: "Tôi là người thích nghi với môi trường mới" },
      { number: 4, question: "Tôi có thể vận hành, điều khiển các máy móc thiết bị" },
      { number: 5, question: "Tôi làm việc các công việc thủ công như gấp giấy, đan, móc" },
      { number: 6, question: "Tôi thích tiếp xúc với thiên nhiên, động vật, cây cỏ" },
      { number: 7, question: "Tôi thích những công việc sử dụng tay chân hơn là trí óc" },
      { number: 8, question: "Tôi thích những công việc thấy ngay kết quả" },
      { number: 9, question: "Tôi thích làm việc ngoài trời hơn là trong phòng học, văn phòng" }
    ],
  }, {
    "code": "10 - 18",
    "value": [
      { number: 10, question: "Tôi có tìm hiểu khám phá vấn đề mới" },
      { number: 11, question: "Tôi có khả năng phân tích vấn đề" },
      { number: 12, question: "Tôi biết suy nghĩ một cách mạch lạc, chặt chẽ" },
      { number: 13, question: "Tôi thích thực hiện các thí nghiệm hay nghiên cứu" },
      { number: 14, question: "Tôi có khả năng tổng hợp, khái quát, suy đoán những vấn đề" },
      { number: 15, question: "Tôi thích những hoạt động điều tra, phân loại, kiểm tra, đánh giá" },
      { number: 16, question: "Tôi tự tổ chức công việc mình phải làm" },
      { number: 17, question: "Tôi thích suy nghĩ về những vấn đề phức tạp, làm những công việc phức tạp" },
      { number: 18, question: "Tôi có khả năng giải quyết các vấn đề" },
    ],
  }, {
    "code": "19 - 27",
    "value": [
      { number: 19, question: "Tôi là người dễ xúc động" },
      { number: 20, question: "Tôi có óc tưởng tượng phong phú" },
      { number: 21, question: "Tôi thích sự tự do, không theo những quy định, quy tắc" },
      { number: 22, question: "Tôi có khả năng thuyết trình, diễn xuất" },
      { number: 23, question: "Tôi có thể chụp hình hoặc vẽ tranh, trang trí, điêu khắc" },
      { number: 24, question: "Tôi có năng khiểu âm nhạc" },
      { number: 25, question: "Tôi có khả năng viết, trình bày những ý tưởng của mình" },
      { number: 26, question: "Tôi thích làm những công việc mới, đòi hỏi sự sáng tạo" },
      { number: 27, question: "Tôi thoải mái bộc lộ những ý thích" },
    ],
  }, {
    "code": "28 - 36",
    "value": [
      { number: 28, question: "Tôi là người thân thiện hay giúp đỡ người khác" },
      { number: 29, question: "Tôi thích gặp gỡ, làm việc với con người" },
      { number: 30, question: "Tôi là người lịch sự, tử tế" },
      { number: 31, question: "Tôi thích khuyên bảo, huấn luyện hay giảng giải cho người khác" },
      { number: 32, question: "Tôi là người biết lắng nghe" },
      { number: 33, question: "Tôi thích các hoạt động chăm sóc sức khỏe của bản thân và người khác" },
      { number: 34, question: "Tôi thích các hoạt động vì mục tiêu chung của cộng đồng, xã hội" },
      { number: 35, question: "Tôi mong muốn mình có đóng góp để xã hội tốt đẹp hơn" },
      { number: 36, question: "Tôi có khả năng hòa giải, giải quyết những sự việc mâu thuẫn" },
    ],
  }, {
    "code": "37 - 45",
    "value": [
      { number: 37, question: "Tôi là người có tính phiêu lưu, mạo hiểm" },
      { number: 38, question: "Tôi có tính quyết đoán" },
      { number: 39, question: "Tôi là người năng động" },
      { number: 40, question: "Tôi có khả năng diễn đạt, tranh luận và thuyết phục người khác" },
      { number: 41, question: "Tôi thích các việc quản lý, đánh giá" },
      { number: 42, question: "Tôi thường đặt ra các mục tiêu, kế hoạch trong cuộc sống" },
      { number: 43, question: "Tôi thích gây ảnh hưởng đến người khác" },
      { number: 44, question: "Tôi là người thích cạnh tranh và muốn mình giỏi hơn người khác" },
      { number: 45, question: "Tôi muốn người khác phải kính trọng, nể phục tôi" },
    ],
  },
  {
    "code": "46 - 54",
    "value": [
      { number: 46, question: "Tôi là người có đầu óc sắp xếp, tổ chức" },
      { number: 47, question: "Tôi có tính cẩn thận" },
      { number: 48, question: "Tôi là người chu đáo, chính xác và đáng tin cậy" },
      { number: 49, question: "Tôi thích công việc tính toán sổ sách, ghi chép số liệu" },
      { number: 50, question: "Tôi thích các công việc lưu trư, phân loại, cập nhật thông tin" },
      { number: 51, question: "Tôi thường đặt ra những mục tiêu, kế hoạch trong cuộc sống" },
      { number: 52, question: "Tôi thích dự kiến các khoản thu chi" },
      { number: 53, question: "Tôi thích lập thời khóa biểu, sắp xếp lịch làm việc" },
      { number: 54, question: "Tôi thích làm việc với các con số, làm việc theo hướng dẫn, quy trình" },
    ]
  }]
  function get_list_by_group(danhsach_cauhoi) {
    let dsch = [];
    danhsach_cauhoi.forEach(element => {
      for (y in element) {
        let obj2 = element[y];
        dsch.push(obj2);
      }
    });
    return dsch;
  }
  // $scope.dsch = getdanhsach_cauhoi($scope.danhsach_cauhoi);
  let danhsachketqua = [
    { id: 1, code: "R", name: "Realistic (Doers)" },
    { id: 2, code: "I", name: "Investigative (Thinkers)" },
    { id: 3, code: "A", name: "Artistic (Creators)" },
    { id: 4, code: "S", name: "Social  (Helpers)" },
    { id: 5, code: "E", name: "Enterprising  (Persuaders)" },
    { id: 6, code: "C", name: "Conventional  (Organizers)" },
  ]

  $scope.danh_sach_giatri_cau_tra_loi = [
    { code: "none", name: "Hoàn toàn sai", value: 0 },
    { code: "none", name: "Đúng một vài trường hợp", value: 1 },
    { code: "none", name: "Đúng một nữa", value: 2 },
    { code: "none", name: "Đúng hầu hết", value: 3 },
    { code: "none", name: "Hoàn toàn đúng", value: 4 },
  ]

  let danhsach_nghenghiep = [
    {
      "code": "R",
      "list": [
        {
          "name": "Aerospace/Aeronautical Engineer (with Investigative)[14]",
        },
        {
          "name": "Agriculture[15]",
        },
        {
          "name": "Animals[14]",
        },
        {
          "name": "Anthropology/Paleontology (with Investigative)[14]",
        },
        {
          "name": "Architect (with Artistic and Enterprising)[15]",
        },
        {
          "name": "Astronomy (with Investigative)[14]",
        },
        {
          "name": "Athletics[16][14]",
        },
        {
          "name": "Carpenter (with Conventional and Investigative)[15]",
        },
        {
          "name": "Culinary arts (with Artistic and Enterprising)[17]",
        },
        {
          "name": "Chemistry/Chemist (with Investigative and Conventional)[15]",
        },
        {
          "name": "Computer engineering/Computer science/Information technology/Computer programmer (with Investigative and Conventional)[15][16]",
        },
        {
          "name": "Dance (with Artistic)[14]",
        },
        {
          "name": "Dentist (with Investigative and Social)[15]",
        },
        {
          "name": "Engineer (with Investigative and Conventional)[15][16]",
        },
        {
          "name": "Environmental science[14]",
        },
        {
          "name": "Fashion design (with Artistic and Enterprising)[15]",
        },
        {
          "name": "Fine Artist Including Painter Sculptor and Illustrator (with Artistic)[18]",
        },
        {
          "name": "Firefighter (with Social and Enterprising)[15]",
        },
        {
          "name": "Graphic designer (with Artistic and Enterprising)[15]",
        },
        {
          "name": "Interior design (with Artistic)[14]",
        },
        {
          "name": "Model (people) (with Artistic and Enterprising)[15]",
        },
        {
          "name": "Musician (with Artistic and Enterprising)[15]",
        },
        {
          "name": "Nurse (with Social Conventional and Investigative)[15][16]",
        },
        {
          "name": "Outdoor recreation[16][14]",
        },
        {
          "name": "Park Naturalist (with Social and Artistic)[15]",
        },
        {
          "name": "Personal trainer (with Enterprising and Social)[15]",
        },
        {
          "name": "Photographer (with Artistic and Enterprising)[15]",
        },
        {
          "name": "Physical therapy (with Social and Investigative)[15]",
        },
        {
          "name": "Driver[15]",
        },
        {
          "name": "Surgeon (with Investigative and Social)[15]",
        },
        {
          "name": "Veterinarian (with Investigative and Social)[15]",
        },
        {
          "name": "Web developer (with ConventionalArtistic ",
        },
        {
          "name": "Zoologists and Wildlife Biologists (with Investigative)[15]",
        }
      ],
    },
    {
      "code": "I",
      "list": [
        {
          "name": "Actuary(with Conventional and Enterprising)[15][16]",
        },
        {
          "name": "Archivist/Librarian (with Social and Conventional)[15]",
        },
        {
          "name": "Biostatistics/Masters in Public Health (with Conventional)[19]",
        },
        {
          "name": "Carpenter (with Conventional and Realistic)[15]",
        },
        {
          "name": "Chemistry/Chemist (with Realistic and Conventional)[15][16]",
        },
        {
          "name": "Community Health Workers/Masters in Public Health (with social and enterprising)[20]",
        },
        {
          "name": "Computer engineering/Computer science/Information technology/Computer programmer (with Realistic and Conventional)[15][16]",
        },
        {
          "name": "Counselor (with Social and Artistic)[15][16]",
        },
        {
          "name": "Dentist (with Realistic and Social)[15]",
        },
        {
          "name": "Dietitian/Nutritionist (with Social and Enterprising)[15]",
        },
        {
          "name": "Economics (with Conventional and social)[14]",
        },
        {
          "name": "Engineer (with Realistic and Conventional)[15][16]",
        },
        {
          "name": "Epidemiology/Masters in Public Health (with Social)[21]",
        },
        {
          "name": "Finance (with Enterprising and Conventional)[15][16]",
        },
        {
          "name": "Lawyer (with Enterprising and Social)[14][15]",
        },
        {
          "name": "Mathematician (with Artistic)",
        },
        {
          "name": "Nurse (with Realistic Conventional and Social)[15][16]",
        },
        {
          "name": "Pharmacist (with Social and Conventional)",
        },
        {
          "name": "Physical therapy (with Social and Realistic)[15]",
        },
        {
          "name": "Physician (Medical school/Medical research) (with Social)[15][16]",
        },
        {
          "name": "Physics[16]",
        },
        {
          "name": "Poets Lyricists and Creative Writers (with Artistic)[22]",
        },
        {
          "name": "Professor/Research - Ph.D.[16][14]",
        },
        {
          "name": "Psychology/Psychologist (with Social and Artistic)[15][16]",
        },
        {
          "name": "Social Work[15]",
        },
        {
          "name": "Surgeon (with Realistic and Social)[15]",
        },
        {
          "name": "Technical writer (with Artistic and Conventional)[15]",
        },
        {
          "name": "Tutor (with Social)[23]",
        },
        {
          "name": "Veterinarian (with Realistic and Social)[15]",
        },
        {
          "name": "Web developer (with Conventional Realistic and Artistic)[15]",
        },
        {
          "name": "Zoologists and Wildlife Biologists(with Realistic)[15]",
        }
      ],
    },
    {
      "code": "A",
      "list": [
        {
          "name": "Architect (with Realistic and Enterprising)[15]",
        },
        {
          "name": "Broadcast journalism (with Enterprising)[15]",
        },
        {
          "name": "Clergy (with Social and Enterprising)[15]",
        },
        {
          "name": "Counselor (with Investigative and Social)[15][16]",
        },
        {
          "name": "Culinary arts (with Realistic and Enterprising)[17][24]",
        },
        {
          "name": "Dance (with Realistic)[14]",
        },
        {
          "name": "Fashion design (with Realistic and Enterprising)[15]",
        },
        {
          "name": "Fine Artist Including Painter Sculptor and Illustrator (with Realistic)[18]",
        },
        {
          "name": "Graphic designer (with Enterprising and Realistic)[15]",
        },
        {
          "name": "Interior design(with Realistic)[14]",
        },
        {
          "name": "Model (people) (with Realistic and Enterprising)[15]",
        },
        {
          "name": "Musician (with Enterprising and Realistic)[15]",
        },
        {
          "name": "Park Naturalist (with Social and Realistic)[15]",
        },
        {
          "name": "Poets Lyricists and Creative Writers (with Investigative)[22]",
        },
        {
          "name": "Psychology/Psychologist (with Social and Investigative); Art therapist/Dance therapy/Drama therapy/Music therapy (with social)[15][16]",
        },
        {
          "name": "Public relations (with Enterprising)[15]",
        },
        {
          "name": "Photographer (with Realistic and Enterprising)[15]",
        },
        {
          "name": "Teacher (with Social)[15][16]",
        },
        {
          "name": "Technical writer (with Investigative and Conventional)[15]",
        },
        {
          "name": "Trainer (business) (with Social and Conventional)[15]",
        },
        {
          "name": "Web developer (with Conventional Realistic and Investigative)[15]",
        }
      ],
    },
    {
      "code": "S",
      "list": [
        {
          "name": "Archivist/Librarian (with Conventional and Investigative)[15]",
        },
        {
          "name": "Clergy (with Artistic and Enterprising)[15]",
        },
        {
          "name": "Community Organizer[16]",
        },
        {
          "name": "Community Health Workers/Masters in Public Health (with Investigative and Enterprising)[20]",
        },
        {
          "name": "Counselor (with Investigative and Artistic)[15][16]",
        },
        {
          "name": "Customer service (with Conventional and Enterprising)[15]",
        },
        {
          "name": "Dentist (with Investigative and Realistic)[15]",
        },
        {
          "name": "Dietitian/Nutritionist (with Investigative and Enterprising)[15]",
        },
        {
          "name": "Economics (with Investigative and Conventional)[14]",
        },
        {
          "name": "Education (Teacher/Counselor/Administration)",
        },
        {
          "name": "Educational administration (with Enterprising and Conventional)[15]",
        },
        {
          "name": "Epidemiology/Masters in Public Health (with Investigative)[21]",
        },
        {
          "name": "Firefighter (with Realistic and Enterprising)[15]",
        },
        {
          "name": "Fitness Trainer and Aerobics Teacher (with Enterprising and Realistic)[15]",
        },
        {
          "name": "Foreign Service/Diplomacy (with Enterprising and Artistic)[25]",
        },
        {
          "name": "Human Resources (with Conventional and Enterprising)[15]",
        },
        {
          "name": "Lawyer (with Investigative and Enterprising)[14][15]",
        },
        {
          "name": "Nurse (with Realistic Conventional and Investigative)[15][16]",
        },
        {
          "name": "Park Naturalist (with Realistic and Artistic)[15]",
        },
        {
          "name": "Pharmacist (with Investigative and Conventional)[15]",
        },
        {
          "name": "Physical therapy (with Realistic and Investigative)[15]",
        },
        {
          "name": "Physician (Medical school/Medical research) (with Investigative)[15][16]",
        },
        {
          "name": "Psychology/Psychologist (with Investigative and Artistic)[15][16]",
        },
        {
          "name": "Public Health Educator/Masters in Public Health (with Enterprising)[26]",
        },
        {
          "name": "Religion[14]",
        },
        {
          "name": "Social Advocate[16]",
        },
        {
          "name": "Sociology[16]",
        },
        {
          "name": "Social Work[15]",
        },
        {
          "name": "Surgeon (with Realistic and Investigative)[15]",
        },
        {
          "name": "Teacher (Early childhood education Primary school Secondary school Teaching English as a second language Special Ed and Substitute teaching) (with Artistic)[15][16][27]",
        },
        {
          "name": "Trainer (business) (with Artistic and Conventional)[15]",
        },
        {
          "name": "Tutor (with Investigative)[23]",
        },
        {
          "name": "Veterinarian (with Investigative and Realistic)[15]",
        }
      ],
    },
    {
      "code": "E",
      "list": [
        {
          "name": "Actuary (with Investigative and Conventional)[15][16]"
        },
        {
          "name": "Architect (with Artistic and Realistic)[15]"
        },
        {
          "name": "Buyer[16]"
        },
        {
          "name": "Community Health Workers/Masters in Public Health (with Investigative and Social)[20]"
        },
        {
          "name": "Culinary arts (with Artistic and Realistic)[17]"
        },
        {
          "name": "Clergy (with Artistic and Social)[15]"
        },
        {
          "name": "Customer service (with Conventional and Social)[15]"
        },
        {
          "name": "Dietitian/Nutritionist (with Social and Investigative)[15]"
        },
        {
          "name": "Educational administration (with Social and Conventional)[15]"
        },
        {
          "name": "Entrepreneur and Business[16]"
        },
        {
          "name": "Fashion design (with Artistic and Realistic)[15]"
        },
        {
          "name": "Finance (with Conventional and Investigative)[15][16]"
        },
        {
          "name": "Foreign Service/Diplomacy (with Social and Artistic)[25]"
        },
        {
          "name": "Firefighter (with Social and Realistic)[15]"
        },
        {
          "name": "Fitness Trainer and Aerobics Teacher (with Realistic and Social)[15]"
        },
        {
          "name": "Fundraising[16]"
        },
        {
          "name": "Graphic designer (with Artistic and Realistic)[15]"
        },
        {
          "name": "Human Resources (with Conventional and Social)[15]"
        },
        {
          "name": "Broadcast journalism (with Artistic)[15]"
        },
        {
          "name": "Lawyer (with Investigative and Social)[14][15]"
        },
        {
          "name": "Management/Management Consultant[16]"
        },
        {
          "name": "Market Research Analyst (with Investigative)[28][16]"
        },
        {
          "name": "Model (people) (with Artistic and Realistic)[15]"
        },
        {
          "name": "Musician (with Artistic and Realistic)[15]"
        },
        {
          "name": "Photographer (with Artistic and Realistic)[15]"
        },
        {
          "name": "Politics[14]"
        },
        {
          "name": "Public Health Educator/Masters in Public Health (with Social)[26]"
        },
        {
          "name": "Public relations/Publicity/Advertising/Marketing (with Artistic)[15]"
        },
        {
          "name": "Public speaking[24]"
        },
        {
          "name": "Real Estate Agent (with Conventional)[15][16]"
        },
        {
          "name": "Sales (with Conventional and Social)[15]"
        }
      ],
    },
    {
      "code": "C",
      "list": [
        {
          "name": "Accounting/Tax advisor (with Enterprising)[15][16]",
        },
        {
          "name": "Actuary (with Investigative and Enterprising)[15][16]",
        },
        {
          "name": "Archivist/Librarian (with Social and Investigative)[15]",
        },
        {
          "name": "Biostatistics/Masters in Public Health (with Investigative)[19]",
        },
        {
          "name": "Carpenter (with Realistic and Investigative)[15]",
        },
        {
          "name": "Chemistry/Chemist (with Investigative and Realistic)[15]",
        },
        {
          "name": "Computer engineering/Computer science/Information technology/Computer programmer (with Investigative and Realistic)[15][16]",
        },
        {
          "name": "Customer service (with Enterprising and Social)[15]",
        },
        {
          "name": "Economics (with Investigative and Social)[14]",
        },
        {
          "name": "Educational administration (with Social and Enterprising)[15]",
        },
        {
          "name": "Engineer (with Investigative and Realistic)[15][16]",
        },
        {
          "name": "Finance (with Enterprising and Investigative)[15][16]",
        },
        {
          "name": "Human Resources (with Enterprising and Social)[15]",
        },
        {
          "name": "Math teacher (with Social)[16]",
        },
        {
          "name": "Nurse (with Realistic C Social 1 and Investigative)[15][16]",
        },
        {
          "name": "Office administration (with Enterprising)[15]",
        },
        {
          "name": "Pharmacist (with Social and Investigative)C[15]",
        },
        {
          "name": "Real Estate Agent (with Enterprising)[15][16]",
        },
        {
          "name": "Statistician(with Realistic and Investigative)[15]",
        },
        {
          "name": "Technical writer (with Artistic and Investigative)[15]",
        },
        {
          "name": "Trainer (business) (with Social and Artistic)[15]",
        },
        {
          "name": "Web developer (with ArtisticC Realistic and Investigative)[15]",
        }
      ]
    }
  ]
  let get_tong_diem_f = (mangsodiem) => {
    let tong_diem = 0;
    for (x in mangsodiem) {
      let obj = mangsodiem[x]
      tong_diem += obj.value;
    }
    return tong_diem;
  }
  let arr_kq = [];
  let arr_tongdiem = [];
  let newarr_tongdiem = [];
  let count = 0;
  $scope.tinhtong = function (result) {
    count++;
    let obj = { value: result }
    arr_kq.push(obj);
    let tongdiem = get_tong_diem_f(arr_kq);
    for (x in arr_kq) {
      $scope.get_tong_diem = { cauhoiso: count, value: tongdiem };
      $scope.save($scope.get_tong_diem);
      arr_kq = [];
    }
  }
  $scope.save = (get_tong_diem) => {
    if (utility.checkValue(get_tong_diem)) {
      arr_tongdiem.push(get_tong_diem);
      if (arr_tongdiem.length >= 9) {
        let tongdiem_9cau = { value: get_tong_diem_f(arr_tongdiem) }
        newarr_tongdiem.push(tongdiem_9cau);
        $scope.newarr_tongdiem = newarr_tongdiem;
        count = 0;
        arr_kq = [];
        arr_tongdiem = [];
        $scope.get_tong_diem = "";
      } else {
        // alert("Chưa chọn hết 9 cái")
      }
    } else {
      alert("no data")
    }
  }
  function indexOfMax(arr) {
    if (arr.length === 0) {
      return -1;
    }

    var max = arr[0];
    var maxIndex = 0;

    for (var i = 1; i < arr.length; i++) {
      if (arr[i] > max) {
        maxIndex = i;
        max = arr[i];
      }
    }

    return maxIndex;
  }
  $scope.vebieudo = () => {
    if (utility.checkValue($scope.newarr_tongdiem)) {
      $scope.list_name = [];
      $scope.list_code = [];
      $scope.tongdiemdothi = [];
      $scope.danhsachnghenghiep = [];

      for (x in danhsachketqua) {
        let obj = danhsachketqua[x];
        $scope.list_name.push(obj.name);
        $scope.list_code.push(obj.code);
      }
      for (x in $scope.newarr_tongdiem) {
        let obj = $scope.newarr_tongdiem[x];
        $scope.tongdiemdothi.push(obj.value)
      }
      let max = $scope.tongdiemdothi.reduce(function (a, b) {
        return Math.max(a, b);
      });
      $scope.max_index = indexOfMax($scope.tongdiemdothi);
      /* get danh sach nghe nghiep */
      $scope.danhsachnghenghiep = danhsach_nghenghiep[$scope.max_index]
      Highcharts.chart('container', {
        chart: {
          polar: true,
          type: 'line'
        },

        title: {
          text: 'Biểu đồ chỉ số tính cách phù hợp với nghề nghiệp nhất'
        },
        xAxis: {
          categories: $scope.list_name,
          tickmarkPlacement: 'on',
          lineWidth: 0
        },

        yAxis: {
          gridLineInterpolation: 'polygon',
          lineWidth: 0,
          min: 0,
          max: max
        },


        legend: {
          align: 'right',
          verticalAlign: 'top',
          y: 70,
          layout: 'vertical'
        },

        series: [
          {
            name: 'Result',
            data: $scope.tongdiemdothi,
            pointPlacement: 'on'
          },

        ]
      });
    } else {
      alert("no data")
    }
  }
  $scope.xemnghephuhop = () => {
    $scope.duochienthi = false;
    if (utility.checkValue($scope.danhsachnghenghiep)) {
      $scope.duochienthi = true;
    } else {
      alert("no data")
    }
  }

  $http({ method: 'GET', url: '/trac_nghiem_tinh_cach' }).then(function success(res) {
    if (res.data.length > 0) {
      $scope.trac_nghiem_tinh_cach_list = res.data;
    } else {
      alert("no data")
    }
  }, function error(err) {
    alert(err)
  });

  var $ctrl = this;
  $ctrl.items = ['item1', 'item2', 'item3'];

  $ctrl.animationsEnabled = true;
  $ctrl.open = function (size, parentSelector) {
    var parentElem = parentSelector ?
      angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
    var modalInstance = $uibModal.open({
      animation: $ctrl.animationsEnabled,
      ariaLabelledBy: 'modal-title',
      ariaDescribedBy: 'modal-body',
      templateUrl: 'views/tracnghiemtinhcach/tntc.edit.html',
      controller: crud_trac_nghiem_tinh_cach_ctrl,
      controllerAs: '$ctrl',
      size: size,
      appendTo: parentElem,
      resolve: {
        items: function () {
          return $ctrl.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $ctrl.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
};
