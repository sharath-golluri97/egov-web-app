var dat = {
  'legal.search': {
    numCols: 4,
    title: 'register.search.document.title',
    useTimestamp: true,
    objectName: '',
    searchUrl: '/lcms-services/legalcase/register/_search?register={name}',
    groups: [
      {
        // label: "legal.parawisecomments.create.group.title.viewDetails",
        name: 'registers',
        fields: [
          {
            name: 'updateRegisterName',
            jsonPath: 'register',
            label: 'createstamp.create.createStampName',
            type: 'text',
            // fullWidth:true,
            pattern: '^[a-zA-Z 0-9]*$',
            isRequired: false,
            isDisabled: false,
            patternErrorMsg: '',
          },
        ],
      },
    ],
    result: {
      header: [
        {
          label: 'Name',
        },
      ],
      values: ['register'],
      resultPath: 'registers',
      resultIdKey: 'code',
      rowClickUrlUpdate: '/update/legal/register/{code}',
      rowClickUrlView: '/view/legal/register/{code}',
    },
    url: '/lcms-services/legalcase/register/_search',
    tenantIdRequired: true,
  },
  'legal.create': {
    numCols: 4,
    title: 'register.create.document.title',
    useTimestamp: true,
    objectName: 'registers',
    groups: [
      {
        // label: "legal.parawisecomments.create.group.title.viewDetails",
        name: 'viewDetails',
        fields: [
          {
            name: 'registerName',
            jsonPath: 'registers[0].register',
            label: 'createstamp.create.createStampName',
            type: 'text',
            maxLength: '100',
            // fullWidth:true,
            pattern: '^[a-zA-Z 0-9]*$',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'registerIsActive',
            jsonPath: 'registers[0].isActive',
            label: 'createstamp.create.isActive',
            pattern: '',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            defaultValue: true,
            requiredErrMsg: '',
            patternErrMsg: '',
          },
        ],
      },
    ],
    url: '/lcms-services/legalcase/register/_create',
    tenantIdRequired: true,
  },
  'legal.update': {
    numCols: 4,
    title: 'register.update.document.title',
    useTimestamp: true,
    objectName: 'registers',
    searchUrl: '/lcms-services/legalcase/register/_search?code={code}',
    groups: [
      {
        // label: "legal.parawisecomments.create.group.title.viewDetails",
        name: 'viewDetails',
        fields: [
          {
            name: 'updateRegisterName',
            jsonPath: 'registers[0].register',
            label: 'createstamp.create.createStampName',
            type: 'text',
            maxLength: '100',
            // fullWidth:true,
            pattern: '^[a-zA-Z 0-9]*$',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'updateRegisterIsActive',
            jsonPath: 'registers[0].isActive',
            label: 'createstamp.create.isActive',
            pattern: '',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            defaultValue: true,
            requiredErrMsg: '',
            patternErrMsg: '',
          },
        ],
      },
    ],
    url: '/lcms-services/legalcase/register/_update',
    tenantIdRequired: true,
  },
  'legal.view': {
    numCols: 4,
    /*  title:"register.update.document.title",*/
    useTimestamp: true,
    objectName: 'registers',
    searchUrl: '/lcms-services/legalcase/register/_search?code={code}',
    groups: [
      {
        // label: "legal.parawisecomments.create.group.title.viewDetails",
        name: 'viewDetails',
        fields: [
          {
            name: 'updateRegisterName',
            jsonPath: 'registers[0].register',
            label: 'createstamp.create.createStampName',
            type: 'text',
            maxLength: '100',
            // fullWidth:true,
            pattern: '^[a-zA-Z 0-9]*$',
            isRequired: true,
            isDisabled: false,
            patternErrorMsg: '',
          },
          {
            name: 'updateRegisterIsActive',
            jsonPath: 'registers[0].isActive',
            label: 'createstamp.create.isActive',
            pattern: '',
            type: 'checkbox',
            isRequired: false,
            isDisabled: false,
            defaultValue: true,
            requiredErrMsg: '',
            patternErrMsg: '',
          },
        ],
      },
    ],
    url: '/lcms-services/legalcase/register/_search?code={code}',
    tenantIdRequired: true,
  },
};
export default dat;
