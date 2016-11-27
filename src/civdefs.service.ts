export class CivDef {
  public civDisplayName: string;
  public leaderDisplayName: string;

  constructor(public civKey: string, public leaderKey: string, public isDLC: boolean, leaderDisplayName?: string) {
    this.civDisplayName = this.defaultDisplayName(civKey);
    this.leaderDisplayName = leaderDisplayName || this.defaultDisplayName(leaderKey);
  }

  getImageFileName() {
    return `${this.civKey.replace('CIVILIZATION_', '')}_${this.leaderKey.replace('LEADER_', '')}.png`;
  }

  private defaultDisplayName(str: string) {
    str = str.replace('CIVILIZATION_', '').replace('LEADER_', '').replace(/_/g, ' ');

    return str.replace(/\w\S*/g, txt => {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
  }
}

export const Civ6Leaders: CivDef[] = [
  new CivDef('CIVILIZATION_FRANCE', 'LEADER_CATHERINE_DE_MEDICI', false),
  new CivDef('CIVILIZATION_EGYPT', 'LEADER_CLEOPATRA', false),
  new CivDef('CIVILIZATION_GERMANY', 'LEADER_BARBAROSSA', false, 'Frederick Barbarossa'),
  new CivDef('CIVILIZATION_INDIA', 'LEADER_GANDHI', false),
  new CivDef('CIVILIZATION_SUMERIA', 'LEADER_GILGAMESH', false),
  new CivDef('CIVILIZATION_GREECE', 'LEADER_GORGO', false),
  new CivDef('CIVILIZATION_NORWAY', 'LEADER_HARDRADA', false, 'Harald Hardrada'),
  new CivDef('CIVILIZATION_JAPAN', 'LEADER_HOJO', false, 'Hojo Tokimune'),
  new CivDef('CIVILIZATION_AZTEC', 'LEADER_MONTEZUMA', true),
  new CivDef('CIVILIZATION_KONGO', 'LEADER_MVEMBA', false, 'Mvemba a Nzinga'),
  new CivDef('CIVILIZATION_BRAZIL', 'LEADER_PEDRO', false, 'Pedro II'),
  new CivDef('CIVILIZATION_GREECE', 'LEADER_PERICLES', false),
  new CivDef('CIVILIZATION_RUSSIA', 'LEADER_PETER_GREAT', false, 'Peter the Great'),
  new CivDef('CIVILIZATION_SPAIN', 'LEADER_PHILIP_II', false, 'Philip II'),
  new CivDef('CIVILIZATION_CHINA', 'LEADER_QIN', false, 'Qin Shi Huang'),
  new CivDef('CIVILIZATION_ARABIA', 'LEADER_SALADIN', false),
  new CivDef('CIVILIZATION_AMERICA', 'LEADER_T_ROOSEVELT', false, 'Teddy Roosevelt'),
  new CivDef('CIVILIZATION_SCYTHIA', 'LEADER_TOMYRIS', false),
  new CivDef('CIVILIZATION_ROME', 'LEADER_TRAJAN', false),
  new CivDef('CIVILIZATION_ENGLAND', 'LEADER_VICTORIA', false)
];
