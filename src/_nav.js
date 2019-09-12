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
          name: 'Equipment Specs Category',
           url: '/Dashboard',
          icon: 'icon-arrow-right',
        },
        {
          name: 'Equipment',
           url: '/EquipmentManagement/Equipment',
          icon: 'icon-arrow-right',
        },
        {
          name: 'Equipment One Time Job',
           url: '/Dashboard',
          icon: 'icon-arrow-right',
        },
        {
          name: 'Rig Equipment Schedule',
           url: '/Dashboard',
          icon: 'icon-arrow-right',
        },
        {
          name: 'Equipment Rig Assignment',
           url: '/Dashboard',
          icon: 'icon-arrow-right',
        },
        {
          name: 'Misc. Equip Rig Assignment',
           url: '/Dashboard',
          icon: 'icon-arrow-right',
        }
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
