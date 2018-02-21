export interface ProfileGoal {
  name: string;
  currentAge: number;
  retirementAge: number;
  lifeExp: number;
  incomeNeed: number;
  estate: number;
  inflation: number;
  annualReturn1: number;
  annualReturn2: number;
  incomeTax: number;
  currentSavings: number;
  otherIncome: number;
  otherIncomeStartAge: number;
  otherIncomeEndEge: number;

  retirementSavingsNeeded: number;
  retirementSavingsSurplus: number;
  retirementSavingPerc: number;

  eoySavingsNeeded: number;
  eoySavingsSurplus: number;
  eoySavingPerc: number;

  goalSchedule: GoalSchedule;
}

export interface GoalsDashBoard {
  _PageHeader: PageHeader;
  name: string;
  shortTermGoal: number;
  shortTermGoalActualPerc: number;
  endGoal: number;
  endGoalActual: number;
  endGoalActualPerc: number;
  scenarioData: ProjectionParameters;
  goalSchedule: GoalSchedule;
}

export class PageHeader {
  name: string;
  noAccounts: number;
  noEntities: number;
  startBalance: number;
  currentBalance: number;
  startDate: String;
  lastDate: String;
  totalProfit: String;
  totalProfitPerc: String;
  assetSpark: String;
  investmentSpark: String;
  balanceSpark: String;
  profitSpark: String;
  startYear: number;
  yTDProfit: number;
  yTDProfitPerc: number;
  yTDBalanceSpark: number;
  yTDProfitSpark: number;
  // year target (retirement)

  yearGoalDate: String;
  yearGoalAmount: number;
  actualvsYearGoal: number;
  actualvsYearGoalPerc: number;
  actualvsYearGoalPerc2: number;
  yTDROIPerc: number;

  // end target (retirement)
  endGoalDate: String;
  endGoalAmount: number;
  actualvsEndGoal: number;
  actualvsEndGoalPerc: number;
  actualvsEndGoalPerc2: String;
  retireROIPerc: number;

  // assets
  assetsCurrent: number;
  assetsNoAccounts: number;
  assetsNoEntities: number;
}

export interface ProjectionParameters {
  name: string;
  calcType: Number;
  currentAge: Number;
  retirementAge: Number;
  lifeExp: Number;
  incomeNeed: Number;
  heirs: Number;
  inflation: Number;
  annualReturn: Number;
  incomeTax: Number;
  currentSavings: Number;
  otherIncome: Number;
  otherIncomeStartAge: Number;
  otherIncomeEndAge: Number;
}

export class GoalSchedule extends Array<GoalScheduleLine> { };

export class GoalScheduleLine {
  year: Number;
  age: Number;
  yearBegin: Number;
  contributions: Number;
  interestEarning: Number;
  cnfladedNeed: Number;
  otherIncome: Number;
  adjustedNeed: Number;
  preTaxNeed: Number;
  yearEndBalance: Number;
  actualYearEndBalance: Number;
  actualvsProjected: Number;
}
