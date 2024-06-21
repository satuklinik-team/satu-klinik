export interface SettingEntity {
  id: string;
  name: string;
  license: string;
  phone: string;
  address: string;
  Setting: SettingFieldEntity[];
}

export interface SettingFieldEntity {
  id: string;
  name: string;
  type: string;
  value: string;
  headerId: string;
  clinicsId: string;
}
