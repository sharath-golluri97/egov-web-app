export const setTenantInfo = tenantInfo => {
  window.localStorage.setItem('tenantInfo', JSON.stringify(tenantInfo));

  return {
    type: 'SET_TENANT_INFO',
    tenantInfo,
  };
};
