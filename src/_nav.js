export default {
  items: [
    {
      name: 'Dashboard',
      url: '/Dashboard',
      icon: 'cui-dashboard',
      
    },
   
    {
      name: 'Equipment Management',
      url: '/theme/typography',
      icon: 'cui-task',
      children: [
        {
          name: 'Equipment Category',
           url: '/EquipmentManagement/EquipmentCategory',
          icon: 'icon-arrow-right',
        },
        {
          name: 'Equipment',
           url: '/EquipmentManagement/Equipment',
          icon: 'icon-arrow-right',
        },
      ]
    },
    
    {
      name: 'Administration',
      url: '/theme/typography',
      icon: 'icon-user',
      children: [
        {
          name: 'User',
           url: '/User',
          icon: 'icon-user',
        },
        {
          name: 'Company',
          url: '/Company',
          icon: 'icon-globe',
        }
      ]
    }
  ]
};
