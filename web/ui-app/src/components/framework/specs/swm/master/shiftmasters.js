var dat = {
    'swm.search': {
      preApiCalls:[
        {
          url:"/egov-mdms-service/v1/_get",
          jsonPath:"shiftType.codeTwo",
          qs:{
            moduleName:"swm",
            masterName:"ShiftType"
          },
          jsExpForDD:{
            key:"$..code",
            value:"$..name",
          }
        },
        {
          url:"/hr-masters/designations/_search",
          jsonPath:"designation.codeDes",
          jsExpForDD:{
            key:"$..code",
            value:"$..name",
          }
        },
      ],
      numCols: 4,
      useTimestamp: true,
      objectName: 'Shift',
      url: '/egov-mdms-service/v1/_search',
      groups: [
        {
          name:'ShiftSelection',
          label: 'swm.shift.create.group.title.ShiftSelection',
          fields: [
            {
              name: 'shift',
              jsonPath: 'code',
              label: 'swm.Shift.create.shift',
              pattern: '',
              type: 'autoCompelete',
              isRequired: false,
              isDisabled: false,
              maxLength: 128,
              minLength: 1,
              patternErrorMsg: '',
              url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=Shift|$..Shift.*.code|$..Shift.*.name',
            },
            {
              name: 'shiftType',
              jsonPath: 'shiftType.code',
              label: 'swm.Shift.create.shiftType',
              pattern: '',
              type: 'singleValueList',
              isRequired: false,
              isDisabled: false,
              maxLength: 12,
              minLength: 6,
              url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=ShiftType|$..ShiftType.*.code|$..ShiftType.*.name',
            },
          ]
        },
      ],
      result: {
        header: [
          {
            label: 'swm.Shift.create.shift',
          },
          {
            label: 'swm.Shift.create.shiftType',
          },
          {
            label: 'swm.Shift.create.designation',
          },
          {
            label: 'swm.Shift.create.shiftStartTime',
            isTime:true
          },
          {
            label: 'swm.Shift.create.shiftEndTime',
            isTime:true
          },
        ],
        values: [
          'name',
          {jsonPath:'shiftType.code',reduxObject:"shiftType.codeTwo",isObj:true,cToN:true},
          {jsonPath:'designation.code',reduxObject:"designation.codeDes",isObj:true,cToN:true},
          'shiftStartTime',
          'shiftEndTime',
        ],
        resultPath: 'MdmsRes.swm.Shift',
        rowClickUrlUpdate: '/update/swm/shiftmasters/{code}',
        rowClickUrlView: '/view/swm/shiftmasters/{code}',
        isMasterScreen: true
      },
    },
    'swm.create': {
      numCols: 3,
      useTimestamp: true,
      objectName: 'MasterMetaData',
      idJsonPath: 'MdmsRes.swm.Shift[0].code',
      title: 'swm.create.page.title.shiftmasters',
      groups: [
        {
          name:'ShiftSelection',
          label: 'swm.shift.create.group.title.ShiftSelection',
          fields: [
            {
              name: 'shiftName',
              jsonPath: 'MasterMetaData.masterData[0].name',
              label: 'swm.Shift.create.shift',
              pattern: '',
              type: 'text',
              isRequired: true,
              isDisabled: false,
              maxLength: 100,
              minLength: 1,
            },
            {
              name: 'shiftType',
              jsonPath: 'MasterMetaData.masterData[0].shiftType.code',
              label: 'swm.Shift.create.shiftType',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 12,
              minLength: 6,
              url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=ShiftType|$..ShiftType.*.code|$..ShiftType.*.name',
            },
            {
              name: 'departmentName',
              jsonPath: 'MasterMetaData.masterData[0].department.code',
              label: 'swm.Shift.create.department',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 128,
              minLength: 1,
              patternErrorMsg: '',
              url: "/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name",
              hasIdConverion: true,
            },
            {
              name: 'designationName',
              jsonPath: 'MasterMetaData.masterData[0].designation.code',
              label: 'swm.Shift.create.designation',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 128,
              minLength: 1,
              patternErrorMsg: '',
              url: '/hr-masters/designations/_search?tenantId=default|$..code|$..name',
            },
            {
              name: 'code',
              jsonPath: 'MasterMetaData.masterData[0].code',
              defaultValue: 'Shift-' + new Date().getTime(),
              isRequired : true,
              type: 'text',
              hide: true,
            },
            {
              name: 'tenantId',
              jsonPath: 'MasterMetaData.masterData[0].tenantId',
              type: 'text',
              defaultValue: localStorage.getItem("tenantId"),
              hide: true
            },
            {
              name: 'moduleName',
              jsonPath: 'MasterMetaData.moduleName',
              type: 'text',
              defaultValue: 'swm',
              hide: true
            },
            {
              name: 'masterName',
              jsonPath: 'MasterMetaData.masterName',
              type: 'text',
              defaultValue: 'Shift',
              hide: true
            },
          ]
        },
        {
          name:'SiftDetails',
          label: 'swm.shift.create.group.title.SiftDetails',
          fields: [
            {
              name: 'shiftStartTime',
              jsonPath: 'MasterMetaData.masterData[0].shiftStartTime',
              label: 'swm.Shift.create.shiftStartTime',
              pattern: '',
              isRequired: true,
              type: 'timePicker',
              isDisabled: false,
              reset:true,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'shiftEndTime',
              jsonPath: 'MasterMetaData.masterData[0].shiftEndTime',
              label: 'swm.Shift.create.shiftEndTime',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isRequired: true,
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'lunchStartTime',
              jsonPath: 'MasterMetaData.masterData[0].lunchStartTime',
              label: 'swm.Shift.create.lunchStartTime',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              isRequired: true,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'lunchEndTime',
              jsonPath: 'MasterMetaData.masterData[0].lunchEndTime',
              label: 'swm.Shift.create.lunchEndTime',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              isRequired: true,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'graceTimeFrom',
              jsonPath: 'MasterMetaData.masterData[0].graceTimeFrom',
              label: 'swm.Shift.create.graceTimeFrom',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              isRequired: true,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'graceTimeTo',
              jsonPath: 'MasterMetaData.masterData[0].graceTimeTo',
              label: 'swm.Shift.create.graceTimeTo',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              isRequired: true,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'remarks',
              jsonPath: 'MasterMetaData.masterData[0].remarks',
              label: 'swm.Shift.create.remarks',
              pattern: '',
              type: 'textarea',
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
          ],
        },
      ],
      url: '/egov-mdms-create/v1/_create',
      tenantIdRequired: true,
      isMDMSScreen:true
    },
    'swm.view': {
      numCols: 4,
      useTimestamp: true,
      objectName: 'Shift',
      searchUrl: '/egov-mdms-service/v1/_search?code={code}',
      groups: [
        {
          name:'ShiftSelection',
          label: 'swm.shift.create.group.title.ShiftSelection',
          fields: [
            {
              name: 'shiftName',
              jsonPath: 'MdmsRes.swm.Shift[0].name',
              label: 'swm.Shift.create.shift',
              pattern: '',
              type: 'text',
              isRequired: true,
              isDisabled: false,
              maxLength: 100,
              minLength: 1,
            },
            {
              name: 'shiftType',
              jsonPath: 'MdmsRes.swm.Shift[0].shiftType.code',
              label: 'swm.Shift.create.shiftType',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 12,
              minLength: 6,
              url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=ShiftType|$..ShiftType.*.code|$..ShiftType.*.name',
            },
            {
              name: 'departmentName',
              jsonPath: 'MdmsRes.swm.Shift[0].department.code',
              label: 'swm.Shift.create.department',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 128,
              minLength: 1,
              patternErrorMsg: '',
              url: "/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name",
              hasIdConverion: true,
            },
            {
              name: 'designationName',
              jsonPath: 'MdmsRes.swm.Shift[0].designation.code',
              label: 'swm.Shift.create.designation',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 128,
              minLength: 1,
              patternErrorMsg: '',
              url: '/hr-masters/designations/_search?tenantId=default|$..code|$..name',
            },
            // {
            //   name: 'code',
            //   jsonPath: 'MdmsRes.swm.Shift[0].code',
            //   defaultValue: 'Shift-' + new Date().getTime(),
            //   isRequired : true,
            //   type: 'text',
            //   hide: true,
            // },
            /*{
              name: 'tenantId',
              jsonPath: 'MdmsRes.swm.Shift[0].tenantId',
              type: 'text',
              defaultValue: localStorage.getItem("tenantId"),
              hide: true
            },
            {
              name: 'moduleName',
              jsonPath: 'MasterMetaData.moduleName',
              type: 'text',
              defaultValue: 'swm',
              hide: true
            },
            {
              name: 'masterName',
              jsonPath: 'MasterMetaData.masterName',
              type: 'text',
              defaultValue: 'Shift',
              hide: true
            },*/
          ]
        },
        {
          name:'SiftDetails',
          label: 'swm.shift.create.group.title.SiftDetails',
          fields: [
            {
              name: 'shiftStartTime',
              jsonPath: 'MdmsRes.swm.Shift[0].shiftStartTime',
              label: 'swm.Shift.create.shiftStartTime',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'shiftEndTime',
              jsonPath: 'MdmsRes.swm.Shift[0].shiftEndTime',
              label: 'swm.Shift.create.shiftEndTime',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'lunchStartTime',
              jsonPath: 'MdmsRes.swm.Shift[0].lunchStartTime',
              label: 'swm.Shift.create.lunchStartTime',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'lunchEndTime',
              jsonPath: 'MdmsRes.swm.Shift[0].lunchEndTime',
              label: 'swm.Shift.create.lunchEndTime',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'graceTimeFrom',
              jsonPath: 'MdmsRes.swm.Shift[0].graceTimeFrom',
              label: 'swm.Shift.create.graceTimeFrom',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'graceTimeTo',
              jsonPath: 'MdmsRes.swm.Shift[0].graceTimeTo',
              label: 'swm.Shift.create.graceTimeTo',
              pattern: '',
              type: 'timePicker',
              reset:true,
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'remarks',
              jsonPath: 'MdmsRes.swm.Shift[0].remarks',
              label: 'swm.Shift.create.remarks',
              pattern: '',
              type: 'textarea',
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
          ],
        },
      ],
      tenantIdRequired: true,
      url: '/egov-mdms-service/v1/_search?code={code}',
    },
    'swm.update': {
      numCols: 3,
      useTimestamp: true,
      objectName: 'Shift',
      idJsonPath: 'MasterMetaData.masterData[0].code',
      groups: [
        {
          name:'ShiftSelection',
          label: 'swm.shift.create.group.title.ShiftSelection',
          fields: [
            {
              name: 'shiftName',
              jsonPath: 'MasterMetaData.masterData[0].name',
              label: 'swm.Shift.create.shift',
              pattern: '',
              type: 'text',
              isRequired: true,
              isDisabled: false,
              maxLength: 100,
              minLength: 1,
            },
            {
              name: 'shiftType',
              jsonPath: 'MasterMetaData.masterData[0].shiftType.code',
              label: 'swm.Shift.create.shiftType',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 12,
              minLength: 6,
              url: '/egov-mdms-service/v1/_get?&moduleName=swm&masterName=ShiftType|$..ShiftType.*.code|$..ShiftType.*.name',
            },
            {
              name: 'departmentName',
              jsonPath: 'MasterMetaData.masterData[0].department.code',
              label: 'swm.Shift.create.department',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 128,
              minLength: 1,
              patternErrorMsg: '',
              url: "/egov-mdms-service/v1/_get?&moduleName=common-masters&masterName=Department|$..code|$..name",
              hasIdConverion: true,
            },
            {
              name: 'designationName',
              jsonPath: 'MasterMetaData.masterData[0].designation.code',
              label: 'swm.Shift.create.designation',
              pattern: '',
              type: 'singleValueList',
              isRequired: true,
              isDisabled: false,
              maxLength: 128,
              minLength: 1,
              patternErrorMsg: '',
              url: '/hr-masters/designations/_search?tenantId=default|$..code|$..name',
            },
            // {
            //   name: 'code',
            //   jsonPath: 'MasterMetaData.masterData[0].code',
            //   defaultValue: 'Shift-' + new Date().getTime(),
            //   isRequired : true,
            //   type: 'text',
            //   hide: true,
            // },
            // {
            //   name: 'tenantId',
            //   jsonPath: 'MasterMetaData.masterData[0].tenantId',
            //   type: 'text',
            //   defaultValue: localStorage.getItem("tenantId"),
            //   hide: true
            // },
            // {
            //   name: 'moduleName',
            //   jsonPath: 'MasterMetaData.moduleName',
            //   type: 'text',
            //   defaultValue: 'swm',
            //   hide: true
            // },
            // {
            //   name: 'masterName',
            //   jsonPath: 'MasterMetaData.masterName',
            //   type: 'text',
            //   defaultValue: 'Shift',
            //   hide: true
            // },
          ]
        },
        {
          name:'SiftDetails',
          label: 'swm.shift.create.group.title.SiftDetails',
          fields: [
            {
              name: 'shiftStartTime',
              jsonPath: 'MasterMetaData.masterData[0].shiftStartTime',
              label: 'swm.Shift.create.shiftStartTime',
              pattern: '',
              type: 'timePicker',
              isDisabled: false,
              isRequired: true,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'shiftEndTime',
              jsonPath: 'MasterMetaData.masterData[0].shiftEndTime',
              label: 'swm.Shift.create.shiftEndTime',
              pattern: '',
              type: 'timePicker',

              isDisabled: false,
              isRequired: true,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'lunchStartTime',
              jsonPath: 'MasterMetaData.masterData[0].lunchStartTime',
              label: 'swm.Shift.create.lunchStartTime',
              pattern: '',
              type: 'timePicker',
              isDisabled: false,
              isRequired: true,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'lunchEndTime',
              jsonPath: 'MasterMetaData.masterData[0].lunchEndTime',
              label: 'swm.Shift.create.lunchEndTime',
              pattern: '',
              type: 'timePicker',
              isRequired: true,
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'graceTimeFrom',
              jsonPath: 'MasterMetaData.masterData[0].graceTimeFrom',
              label: 'swm.Shift.create.graceTimeFrom',
              pattern: '',
              type: 'timePicker',
              isDisabled: false,
              isRequired: true,
              maxLength: 12,
              minLength: 6,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'graceTimeTo',
              jsonPath: 'MasterMetaData.masterData[0].graceTimeTo',
              label: 'swm.Shift.create.graceTimeTo',
              pattern: '',
              type: 'timePicker', 
              isRequired: true,
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
            {
              name: 'remarks',
              jsonPath: 'MasterMetaData.masterData[0].remarks',
              label: 'swm.Shift.create.remarks',
              pattern: '',
              type: 'textarea',
              isDisabled: false,
              patternErrorMsg: '',
              url: '',
            },
          ],
        },
      ],
      url: '/egov-mdms-create/v1/_update',
      tenantIdRequired: true,
      isMDMSScreen: true,
      searchUrl: '/egov-mdms-service/v1/_search?code={code}',
    },
  };
  export default dat;
