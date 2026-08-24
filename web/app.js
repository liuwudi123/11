// WSO 指标数据录入 - 多行列表版
const FIELDS = [
  { col: 1, key: 'case_id', label: '患者编号', type: 'text', header: '患者编号\n【患者编号不为重复值】\n【注：背景为深橘黄色字段会触发业务逻辑检验，浅橘色背景字段需根据业务逻辑填写；\n红色字体字段为脑防委数据上报系统包含内容；\n业务逻辑请见《帮助手册》（点击系统右上角登录名称后可见）】' },
  { col: 2, key: 'age', label: '卒中时年龄', type: 'number', min: 0, max: 120, header: '卒中时年龄\n0 - 120' },
  { col: 3, key: 'sex', label: '性别', type: 'select', options: [['male','男-male'],['female','女-female']], header: '性别:\n男-male\n女-female' },
  { col: 4, key: 'onset_ts', label: '卒中发病时间', type: 'datetime', header: '卒中发病时间' },
  { col: 5, key: 'arrival_ts', label: '到达医院时间', type: 'datetime', header: '到达医院时间' },
  { col: 6, key: 'hospitalized_in', label: '住院床位类型', type: 'select', options: [['ICU','NICU - ICU'],['monitored','卒中监护床位 - monitored'],['standard','卒中普通床位 - standard'],['others','其他床位 - others']], header: '住院床位类型:\nNICU - ICU\n卒中监护床位 - monitored\n卒中普通床位 - standard\n其他床位 - others' },
  { col: 7, key: 'arrived_from', label: '到院患者的来源地', type: 'select', options: [['home/scene','家中或发病现场-home/scene'],['GP','社区医院-GP'],['primary','下级卒中中心（已诊断卒中并处置）-primary'],['inhospital','院内发病-inhospital'],['other','其他医院-other']], header: '到院患者的来源地：\n家中或发病现场-home/scene\n社区医院-GP\n下级卒中中心（已诊断卒中并处置）-primary\n院内发病-inhospital\n其他医院-other' },
  { col: 8, key: 'arrived_by', label: '患者送至医院的交通方式', type: 'select', options: [['EMS','急救车-EMS'],['private','私家车-private'],['transfer','院间转诊-transfer']], header: '患者送至医院的交通方式：\n急救车-EMS\n私家车-private\n院间转诊-transfer' },
  { col: 9, key: 'ems_prenotification', label: '急救车是否提前通知', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '急救车是否提前通知：\n是-YES\n否-NO' },
  { col: 10, key: 'history_hypertension', label: '高血压病史', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '高血压病史：\n是-YES\n否-NO' },
  { col: 11, key: 'history_diabetes', label: '糖尿病病史', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '糖尿病病史：\n是-YES\n否-NO' },
  { col: 12, key: 'history_hyperlipidemia', label: '高脂血症病史', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '高脂血症病史：\n是-YES\n否-NO' },
  { col: 13, key: 'history_smoker', label: '近半年内吸烟史', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '近半年内吸烟史：\n是-YES\n否-NO' },
  { col: 14, key: 'history_previous_i_s', label: '既往急性缺血性卒中/短暂性脑缺血发作史', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '既往急性缺血性卒中/短暂性脑缺血发作史：\n是-YES\n否-NO' },
  { col: 15, key: 'before_onset_a_anti', label: '卒中前正在接受抗凝治疗', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '卒中前正在接受抗凝治疗：\n是-YES\n否-NO' },
  { col: 16, key: 'previous_mrs', label: '发病前改良Rankin量表评分', type: 'number', min: 0, max: 5, header: '发病前改良Rankin量表评分\n0-5' },
  { col: 17, key: 'admission_nihss', label: '入院时NIHSS评分', type: 'number', min: 0, max: 42, header: '入院时美国国立卫生研究院卒中量表（NIHSS）评分\n0-42' },
  { col: 18, key: 'systolic_blood_pressure', label: '入院后首次测量的收缩压', type: 'number', min: 0, max: 300, header: '入院后首次测量的收缩压\n0-300' },
  { col: 19, key: 'diatolic_blood_pressure', label: '入院后首次测量的舒张压', type: 'number', min: 0, max: 200, header: '入院后首次测量的舒张压\n0-200' },
  { col: 20, key: 'brain_imaging_type', label: '首次脑影像学检查类型', type: 'select', options: [['CT','CT-CT'],['CT+CTA','CT+CTA-CT+CTA'],['CT+CTA+CTP','CT+CTA+CTP-CT+CTA+CTP'],['MR','MR-MR'],['MR+MRA','MR+MRA-MR+MRA'],['MR+MRA+MRP','MR+MRA+MRP-MR+MRA+MRP'],['elsewhere','外院检查-elsewhere'],['none','未检查-none']], header: '首次脑影像学检查类型:\nCT-CT\nCT+CTA-CT+CTA\nCT+CTA+CTP-CT+CTA+CTP\nMR-MR\nMR+MRA-MR+MRA\nMR+MRA+MRP-MR+MRA+MRP\n外院检查-elsewhere\n未检查-none' },
  { col: 21, key: 'brain_imaging_ts', label: '首次脑影像学检查时间', type: 'datetime', header: '首次脑影像学检查时间' },
  { col: 22, key: 'baseline_aspects', label: '基线ASPECTS评分', type: 'number', min: 0, max: 10, header: '基线ASPECTS评分\n0-10分' },
  { col: 23, key: 'is_vessel', label: '缺血性脑卒中部位', type: 'select', options: [['AC','前循环-AC'],['PC','后循环-PC'],['BOTH','前循环+后循环-BOTH']], header: '缺血性脑卒中部位\n前循环-AC\n后循环-PC\n前循环+后循环-BOTH' },

  // 卒中类型：分水岭开关
  { col: 24, key: 'stroke_type', label: '卒中类型', type: 'select', options: [['AIS','急性脑梗死-AIS'],['TIA','短暂性脑缺血发作-TIA'],['ICH','脑出血-ICH'],['SAH','蛛网膜下腔出血-SAH'],['CVT','静脉窦血栓形成-CVT'],['mimics','类卒中-mimics'],['undetermined','诊断不明-undetermined']], header: '卒中类型:\n急性脑梗死-AIS\n短暂性脑缺血发作-TIA\n脑出血-ICH\n蛛网膜下腔出血-SAH\n静脉窦血栓形成-CVT\n类卒中-mimics\n诊断不明-undetermined' },

  // 第 1 组：静脉溶栓（25-29），仅 AIS/TIA 显示
  { col: 25, key: 'thrombolysis_done', label: '静脉溶栓治疗', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '静脉溶栓治疗:\n是-YES\n否-NO', showWhen: d => ['AIS','TIA'].includes(d.stroke_type) },
  { col: 26, key: 'no_thrombolysis_reason', label: '未进行静脉溶栓治疗的原因', type: 'select', options: [['contraindication','禁忌症-contraindication'],['consent','符合指征但患者或家属拒绝-consent'],['elsewhere','外院溶栓-elsewhere'],['transferred','转其他医院溶栓-transferred'],['other','其他原因-other']], header: '未进行静脉溶栓治疗的原因:\n禁忌症-contraindication\n符合指征但患者或家属拒绝-consent\n外院溶栓-elsewhere\n转其他医院溶栓-transferred\n其他原因-other', showWhen: d => d.thrombolysis_done === 'NO' },
  { col: 27, key: 'thrombolysis_drug', label: '静脉溶栓药物', type: 'select', options: [['alteplase','阿替普酶-alteplase'],['tenecteplase','替奈普酶-tenecteplase'],['urokinase','尿激酶-urokinase']], header: '静脉溶栓药物:\n阿替普酶-alteplase\n替奈普酶-tenecteplase\n尿激酶-urokinase', showWhen: d => d.thrombolysis_done === 'YES' },
  { col: 28, key: 'thrombolysis_bolus_ts', label: '静脉溶栓开始时间', type: 'datetime', header: '静脉溶栓开始时间', showWhen: d => d.thrombolysis_done === 'YES' },
  { col: 29, key: 'ais_mimics_anti_treatment', label: '静脉溶栓前静脉降压治疗', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '静脉溶栓前静脉降压治疗：\n是-YES\n否-NO', showWhen: d => d.thrombolysis_done === 'YES' },

  // 第 2 组：机械取栓（30-34），仅 AIS/TIA 显示
  { col: 30, key: 'thrombectomy_done', label: '机械取栓治疗', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '机械取栓治疗：\n是-YES\n否-NO', showWhen: d => ['AIS','TIA'].includes(d.stroke_type) },
  { col: 31, key: 'thrombectomy_groin_p_ts', label: '机械取栓股动脉穿刺时间', type: 'datetime', header: '机械取栓股动脉穿刺时间', showWhen: d => d.thrombectomy_done === 'YES' },
  { col: 32, key: 'thrombectomy_mtici_score', label: '机械取栓术后mTICI评分', type: 'select', options: [['0','0'],['1','1'],['2A','2A'],['2B','2B'],['2C','2C'],['3','3']], header: '机械取栓术后改良的脑缺血治疗分级（mTICI）:\n0\n1\n2A\n2B\n2C\n3', showWhen: d => d.thrombectomy_done === 'YES' },
  { col: 33, key: 'thrombectomy_reperfusion_ts', label: '机械取栓术后血管再通时间', type: 'datetime', header: '机械取栓术后血管再通时间', showWhen: d => d.thrombectomy_done === 'YES' },
  { col: 34, key: 'symptomatic_hemorrhage_a_t', label: '再灌注治疗后症状性颅内出血', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '再灌注治疗后症状性颅内出血：\n是-YES\n否-NO', showWhen: d => d.thrombectomy_done === 'YES' },

  // 第 3 组：脑出血静脉降压（35-36），仅 ICH 显示
  { col: 35, key: 'iv_antihypertensive_a', label: '脑出血静脉降压治疗', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '脑出血静脉降压治疗：\n是-YES\n否-NO', showWhen: d => d.stroke_type === 'ICH' },
  { col: 36, key: 'iv_antihypertensive_ts', label: '脑出血静脉降压治疗开始时间', type: 'datetime', header: '脑出血静脉降压治疗开始时间', showWhen: d => d.iv_antihypertensive_a === 'YES' },

  // 第 4 组：脑出血抗凝逆转（37-38），仅 ICH 显示
  { col: 37, key: 'ich_anticoagulant_r_t', label: '脑出血抗凝逆转剂治疗', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '脑出血抗凝逆转剂治疗：\n是-YES\n否-NO', showWhen: d => d.stroke_type === 'ICH' },
  { col: 38, key: 'anticoagulant_reversal_ts', label: '脑出血抗凝逆转剂治疗开始时间', type: 'datetime', header: '脑出血抗凝逆转剂治疗开始时间', showWhen: d => d.ich_anticoagulant_r_t === 'YES' },

  { col: 39, key: 'afib_flutter', label: '入院时已知或住院期间检测到心房颤动/扑动', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '入院时已知或住院期间检测到心房颤动/扑动：\n是-YES\n否-NO' },
  { col: 40, key: 'serious_complication', label: '卒中后出现严重并发症', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '卒中后出现严重并发症：\n是-YES\n否-NO' },
  { col: 41, key: 'ischemic_stroke_e', label: '缺血性脑卒中病因', type: 'select', options: [['atherosclerosis','大动脉粥样硬化-atherosclerosis'],['cardioembolism','心源性栓塞-cardioembolism'],['vessel','小血管病-vessel'],['cryptogenic','隐源性-cryptogenic'],['other','其他病因-other']], header: '缺血性脑卒中病因:\n大动脉粥样硬化-atherosclerosis\n心源性栓塞-cardioembolism\n小血管病-vessel\n隐源性-cryptogenic\n其他病因-other', showWhen: d => ['AIS','TIA'].includes(d.stroke_type) },
  { col: 42, key: 'swallowing_screening', label: '吞咽功能评估', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '吞咽功能评估：\n是-YES\n否-NO' },
  { col: 43, key: 'physiotherapy_assessed', label: '康复治疗评估', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '康复治疗评估：\n是-YES\n否-NO' },
  { col: 44, key: 'discharge_destination', label: '患者出院去向/结局', type: 'select', options: [['home','回家-home'],['department','院内转科-department'],['rehabilitation','转康复医院-rehabilitation'],['center','转其他医院-center'],['social','转护理机构-social'],['dead','死亡-dead']], header: '患者出院去向/结局:\n回家-home\n院内转科-department\n转康复医院-rehabilitation\n转其他医院-center\n转护理机构-social\n死亡-dead' },
  { col: 45, key: 'discharge_date', label: '出院或死亡日期', type: 'datetime', header: '出院或死亡日期' },
  { col: 46, key: 'discharge_nihss', label: '出院时NIHSS评分', type: 'number', min: 0, max: 42, header: '出院时NIHSS评分\n0-42' },
  { col: 47, key: 'discharge_mrs', label: '出院时改良Rankin量表评分', type: 'number', min: 0, max: 6, header: '出院时改良Rankin量表评分\n0-6' },
  { col: 48, key: 'discharge_antihypertensive', label: '出院处方降压药物', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '出院处方降压药物：\n是-YES\n否-NO' },
  { col: 49, key: 'statin_prescribed_discharge', label: '出院处方他汀药物', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '出院处方他汀药物：\n是-YES\n否-NO' },
  { col: 50, key: 'discharge_any_antiplatelet', label: '出院处方抗血小板药物', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '出院处方抗血小板药物：\n是-YES\n否-NO' },
  { col: 51, key: 'discharge_any_anti', label: '出院处方抗凝药物', type: 'select', options: [['YES','是-YES'],['NO','否-NO']], header: '出院处方抗凝药物：\n是-YES\n否-NO' },
  { col: 52, key: 'mrs_90d', label: '卒中后90天时改良Rankin量表评分', type: 'number', min: 0, max: 6, header: '卒中后90天时改良Rankin量表评分\n0-6' },
];

const FIELD_BY_KEY = Object.fromEntries(FIELDS.map(f => [f.key, f]));

// 表单分组（用于编辑弹窗内展示）
const FORM_GROUPS = [
  { title: '基本信息', keys: ['case_id','age','sex','onset_ts','arrival_ts','hospitalized_in','arrived_from','arrived_by','ems_prenotification'] },
  { title: '既往史与入院评估', keys: ['history_hypertension','history_diabetes','history_hyperlipidemia','history_smoker','history_previous_i_s','before_onset_a_anti','previous_mrs','admission_nihss','systolic_blood_pressure','diatolic_blood_pressure'] },
  { title: '影像与诊断', keys: ['brain_imaging_type','brain_imaging_ts','baseline_aspects','is_vessel','stroke_type','ischemic_stroke_e'] },
  { title: '缺血性卒中治疗（AIS/TIA 时显示）', keys: ['thrombolysis_done','no_thrombolysis_reason','thrombolysis_drug','thrombolysis_bolus_ts','ais_mimics_anti_treatment','thrombectomy_done','thrombectomy_groin_p_ts','thrombectomy_mtici_score','thrombectomy_reperfusion_ts','symptomatic_hemorrhage_a_t'] },
  { title: '脑出血治疗（ICH 时显示）', keys: ['iv_antihypertensive_a','iv_antihypertensive_ts','ich_anticoagulant_r_t','anticoagulant_reversal_ts'] },
  { title: '并发症与病因', keys: ['afib_flutter','serious_complication','swallowing_screening','physiotherapy_assessed'] },
  { title: '出院与随访', keys: ['discharge_destination','discharge_date','discharge_nihss','discharge_mrs','discharge_antihypertensive','statin_prescribed_discharge','discharge_any_antiplatelet','discharge_any_anti','mrs_90d'] },
];

// 列表展示列（精简表头）
const LIST_COLUMNS = [
  { key: 'case_id', label: '患者编号' },
  { key: 'age', label: '年龄' },
  { key: 'sex', label: '性别' },
  { key: 'onset_ts', label: '发病时间' },
  { key: 'arrival_ts', label: '到达时间' },
  { key: 'stroke_type', label: '卒中类型' },
  { key: 'discharge_destination', label: '出院去向' },
  { key: 'discharge_date', label: '出院日期' },
];

const STORAGE_KEY = 'wso_records_v1';
let records = [];
let editingIndex = null; // null = 新建，>=0 = 编辑已有

// ===== 存储 =====
function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    records = raw ? JSON.parse(raw) : [];
  } catch (e) {
    records = [];
  }
}
function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

// ===== 工具 =====
function emptyRecord() {
  const r = {};
  FIELDS.forEach(f => { r[f.key] = ''; });
  return r;
}
function formatDateTime(value) {
  if (!value) return '';
  const [date, time] = value.split('T');
  if (!date || !time) return value;
  const [y, m, d] = date.split('-').map(Number);
  // 控件可能返回 "14:30"（无秒）或 "14:30:45"（有秒），统一补全到 3 段
  const parts = time.split(':');
  while (parts.length < 3) parts.push('00');
  return `${y}/${m}/${d}T${parts.slice(0, 3).join(':')}`;
}
function formatDisplay(value, field) {
  if (!value) return '';
  if (field.type === 'datetime') return formatDateTime(value);
  return value;
}
function validateRecord(data) {
  const errors = [];
  FIELDS.forEach(f => {
    const visible = f.showWhen ? f.showWhen(data) : true;
    if (!visible) return;
    const v = data[f.key];
    if (f.type === 'number' && v !== '' && v !== null && v !== undefined) {
      const n = Number(v);
      if (Number.isNaN(n)) { errors.push(`${f.label} 必须是数字`); return; }
      if (f.min !== undefined && n < f.min) errors.push(`${f.label} 不能小于 ${f.min}`);
      if (f.max !== undefined && n > f.max) errors.push(`${f.label} 不能大于 ${f.max}`);
    }
  });
  return errors;
}

// ===== 列表渲染 =====
function renderList() {
  const tbody = document.getElementById('list-tbody');
  tbody.innerHTML = '';
  if (records.length === 0) {
    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="${LIST_COLUMNS.length + 2}" class="px-4 py-8 text-center text-slate-400 text-sm">暂无记录，点击"新增记录"开始录入</td>`;
    tbody.appendChild(tr);
  } else {
    records.forEach((rec, idx) => {
      const tr = document.createElement('tr');
      tr.className = 'border-t border-slate-100 hover:bg-slate-50';
      let html = '';
      LIST_COLUMNS.forEach(c => {
        const f = FIELD_BY_KEY[c.key];
        html += `<td class="px-4 py-3 text-sm text-slate-700 whitespace-nowrap">${escapeHtml(formatDisplay(rec[c.key], f))}</td>`;
      });
      html += `<td class="px-4 py-3 text-right whitespace-nowrap">
        <button class="text-blue-600 hover:text-blue-800 text-sm font-medium mr-3" data-edit="${idx}">编辑</button>
        <button class="text-red-500 hover:text-red-700 text-sm font-medium" data-del="${idx}">删除</button>
      </td>`;
      tr.innerHTML = html;
      tbody.appendChild(tr);
    });
  }
  document.getElementById('count-badge').textContent = records.length;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ===== 编辑弹窗 =====
function openEditor(index) {
  editingIndex = index;
  const data = index === null ? emptyRecord() : { ...records[index] };
  const formRoot = document.getElementById('editor-fields');
  formRoot.innerHTML = '';
  FORM_GROUPS.forEach(g => {
    const section = document.createElement('div');
    section.className = 'mb-5';
    const title = document.createElement('h3');
    title.className = 'text-sm font-semibold text-slate-800 mb-3 pb-1 border-b border-slate-100';
    title.textContent = g.title;
    section.appendChild(title);
    const grid = document.createElement('div');
    grid.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3';
    g.keys.forEach(key => {
      const f = FIELD_BY_KEY[key];
      if (!f) return;
      grid.appendChild(createEditorField(f, data[f.key]));
    });
    section.appendChild(grid);
    formRoot.appendChild(section);
  });
  document.getElementById('modal-title').textContent = index === null ? '新增记录' : '编辑记录';
  document.getElementById('editor-modal').classList.remove('hidden');
  document.getElementById('editor-modal').classList.add('flex');
  updateEditorVisibility(data);
}

function createEditorField(f, value) {
  const wrapper = document.createElement('div');
  wrapper.className = 'editor-field';
  wrapper.dataset.key = f.key;
  const label = document.createElement('label');
  label.className = 'block text-xs font-medium text-slate-600 mb-1';
  label.textContent = f.label;
  wrapper.appendChild(label);

  let input;
  if (f.type === 'select') {
    input = document.createElement('select');
    input.className = 'w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
    const empty = document.createElement('option');
    empty.value = ''; empty.textContent = '请选择';
    input.appendChild(empty);
    f.options.forEach(([v, t]) => {
      const opt = document.createElement('option');
      opt.value = v; opt.textContent = t;
      input.appendChild(opt);
    });
  } else if (f.type === 'number') {
    input = document.createElement('input');
    input.type = 'number';
    input.className = 'w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
    if (f.min !== undefined) input.min = f.min;
    if (f.max !== undefined) input.max = f.max;
  } else if (f.type === 'datetime') {
    input = document.createElement('input');
    input.type = 'datetime-local';
    // step=1 让控件支持秒（默认 step=60 只有分钟精度）
    input.step = '1';
    input.className = 'w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
  } else {
    input = document.createElement('input');
    input.type = 'text';
    input.className = 'w-full rounded-lg border border-slate-300 px-2.5 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
  }
  input.dataset.key = f.key;
  input.value = value ?? '';
  wrapper.appendChild(input);
  input.addEventListener('change', () => {
    const d = collectEditorData();
    updateEditorVisibility(d);
  });
  input.addEventListener('input', () => {
    const d = collectEditorData();
    updateEditorVisibility(d);
  });
  return wrapper;
}

function collectEditorData() {
  const d = {};
  document.querySelectorAll('#editor-fields .editor-field').forEach(w => {
    const k = w.dataset.key;
    const el = w.querySelector('input, select');
    d[k] = el ? el.value : '';
  });
  return d;
}

function updateEditorVisibility(data) {
  document.querySelectorAll('#editor-fields .editor-field').forEach(w => {
    const f = FIELD_BY_KEY[w.dataset.key];
    const visible = f.showWhen ? f.showWhen(data) : true;
    if (visible) {
      w.classList.remove('hidden');
    } else {
      w.classList.add('hidden');
      const el = w.querySelector('input, select');
      if (el) el.value = '';
    }
  });
}

function closeEditor() {
  document.getElementById('editor-modal').classList.add('hidden');
  document.getElementById('editor-modal').classList.remove('flex');
  editingIndex = null;
}

// ===== 导出 =====
function exportExcel() {
  if (records.length === 0) {
    showToast('暂无可导出的记录', true);
    return;
  }
  if (typeof TEMPLATE_B64 === 'undefined') {
    showToast('未找到内嵌模板，导出失败', true);
    return;
  }

  const bytes = base64ToUint8Array(TEMPLATE_B64);
  const wb = new ExcelJS.Workbook();
  wb.xlsx.load(bytes).then(() => {
    const ws = wb.getWorksheet('template') || wb.worksheets[0];
    // 数据从第 3 行开始
    records.forEach((rec, i) => {
      const excelRow = 3 + i;
      FIELDS.forEach(f => {
        let v = rec[f.key];
        if (f.type === 'datetime') v = formatDateTime(v);
        if (v === '' || v === undefined || v === null) return;
        const cell = ws.getCell(excelRow, f.col);
        if (f.type === 'number') {
          cell.value = Number(v);
        } else {
          cell.value = v;
        }
      });
    });
    const now = new Date();
    const pad = n => String(n).padStart(2, '0');
    const filename = `WSO指标数据_${now.getFullYear()}${pad(now.getMonth()+1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}.xlsx`;
    wb.xlsx.writeBuffer().then(buf => {
      saveBufferAsFile(buf, filename);
      showToast('导出成功：' + filename);
    });
  });
}

function base64ToUint8Array(b64) {
  const binary = atob(b64);
  const len = binary.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}

function saveBufferAsFile(buffer, filename) {
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// ===== Toast =====
function showToast(msg, isError = false) {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-lg shadow-lg text-sm text-white transition-opacity z-50 ' + (isError ? 'bg-red-600' : 'bg-slate-900');
  toast.style.opacity = '1';
  setTimeout(() => { toast.style.opacity = '0'; }, 2500);
}

// ===== 事件绑定 =====
function bindEvents() {
  document.getElementById('btn-add').addEventListener('click', () => openEditor(null));
  document.getElementById('btn-export').addEventListener('click', exportExcel);
  document.getElementById('btn-clear-all').addEventListener('click', () => {
    if (confirm('确定清空所有记录？此操作不可恢复。')) {
      records = [];
      saveRecords();
      renderList();
      showToast('已清空所有记录');
    }
  });

  document.getElementById('list-tbody').addEventListener('click', e => {
    const editBtn = e.target.closest('[data-edit]');
    const delBtn = e.target.closest('[data-del]');
    if (editBtn) openEditor(Number(editBtn.dataset.edit));
    if (delBtn) {
      if (confirm('确定删除这条记录？')) {
        records.splice(Number(delBtn.dataset.del), 1);
        saveRecords();
        renderList();
      }
    }
  });

  document.getElementById('btn-save-record').addEventListener('click', () => {
    const data = collectEditorData();
    const errs = validateRecord(data);
    if (errs.length) {
      showToast('校验未通过：' + errs.slice(0, 3).join('；'), true);
      return;
    }
    if (editingIndex === null) {
      records.push(data);
    } else {
      records[editingIndex] = data;
    }
    saveRecords();
    renderList();
    closeEditor();
    showToast(editingIndex === null ? '已新增记录' : '已保存修改');
  });
  document.getElementById('btn-cancel-record').addEventListener('click', closeEditor);
  document.getElementById('btn-cancel-record2').addEventListener('click', closeEditor);
  document.getElementById('editor-modal').addEventListener('click', e => {
    if (e.target.id === 'editor-modal') closeEditor();
  });
}

// ===== 启动 =====
function init() {
  loadRecords();
  renderList();
  bindEvents();
}
document.addEventListener('DOMContentLoaded', init);
