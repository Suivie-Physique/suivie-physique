
export interface ProfileMenuItem {
    title: string;
    icon: string;
    link: string;
}

export class ProfileMenu {
  public static menus: ProfileMenuItem[] = [{
    title: 'Your Profile',
    icon: './assets/icons/heroicons/outline/user-circle.svg',
    link: '/dashboard/settings/profile',
  },
  {
    title: 'Settings',
    icon: './assets/icons/heroicons/outline/cog-6-tooth.svg',
    link: '/dashboard/settings/compte',
  },
  {
    title: 'Log out',
    icon: './assets/icons/heroicons/outline/logout.svg',
    link: '/auth/logout',
  },
  ];
}
