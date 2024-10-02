export interface MenuItem {
  name: string;
  i18n_key: string;
  icon?: string;
  link?: string;
  children?: MenuItem[];
}
