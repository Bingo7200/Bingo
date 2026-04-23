const COURSES_DATA = [
  // ============================================================
  // 课程1：Python数据分析基础
  // ============================================================
  {
    id: 'python-basics',
    title: 'Python数据分析基础',
    icon: '🐍',
    difficulty: 'beginner',
    description: '从零开始学习Python编程，掌握数据分析必备的编程基础',
    category: '编程基础',
    lessons: [
      {
        id: 'python-basics-01',
        title: 'Python环境介绍',
        type: 'theory',
        duration: 15,
        content: `
<p>欢迎来到Python数据分析的世界！Python是当今数据分析领域最流行的编程语言之一，它拥有丰富的第三方库生态，能够高效地完成数据处理、分析和可视化工作。</p>
<h3>为什么选择Python做数据分析？</h3>
<p>Python在商务数据分析领域具有以下优势：</p>
<ul>
  <li><strong>语法简洁易学</strong>：Python的代码接近自然语言，初学者也能快速上手</li>
  <li><strong>强大的数据科学生态</strong>：Pandas、NumPy、Matplotlib、Scikit-learn等库覆盖了数据分析全流程</li>
  <li><strong>广泛的社区支持</strong>：海量教程、文档和开源项目可供参考</li>
  <li><strong>良好的兼容性</strong>：支持多种数据格式（CSV、Excel、JSON、数据库等）</li>
</ul>
<h3>Python数据分析核心工具链</h3>
<pre><code class="language-python"># Python数据分析常用库
import pandas as pd      # 数据处理与分析
import numpy as np       # 数值计算
import matplotlib.pyplot as plt  # 数据可视化
import seaborn as sns    # 高级统计可视化

print("Python数据分析环境已就绪！")
print("版本信息：")
print(f"Pandas: {pd.__version__}")
print(f"NumPy: {np.__version__}")
</code></pre>
<div class="tip"><strong>💡 提示：</strong>本平台已内置Pyodide运行环境，你无需在本地安装Python，可以直接在浏览器中运行所有代码示例和练习题。</div>
<h3>第一个Python程序</h3>
<pre><code class="language-python"># 经典的Hello World
print("Hello, 数据分析！")

# 简单的计算
revenue = 150000
cost = 98000
profit = revenue - cost
profit_rate = profit / revenue * 100

print(f"营收: {revenue} 元")
print(f"成本: {cost} 元")
print(f"利润: {profit} 元")
print(f"利润率: {profit_rate:.1f}%")
</code></pre>
<div class="warning"><strong>⚠️ 注意：</strong>在Python中，代码的缩进非常重要（通常使用4个空格）。缩进错误会导致程序无法运行，这是初学者最常犯的错误之一。</div>
        `
      },
      {
        id: 'python-basics-02',
        title: '变量与数据类型',
        type: 'theory',
        duration: 20,
        content: `
<p>变量是程序中存储数据的容器，数据类型决定了数据的性质和可执行的操作。理解变量和数据类型是编程的基础。</p>
<h3>变量的定义与命名</h3>
<pre><code class="language-python"># 变量赋值
company_name = "智联科技"
employee_count = 256
annual_revenue = 5280000.50
is_public = False

# 变量命名规则
# 1. 只能包含字母、数字和下划线
# 2. 不能以数字开头
# 3. 不能使用Python关键字
# 4. 推荐使用小写字母和下划线（snake_case）

# 多重赋值
x, y, z = 10, 20, 30
print(f"x={x}, y={y}, z={z}")
</code></pre>
<h3>Python基本数据类型</h3>
<pre><code class="language-python"># 1. 整数 (int)
product_price = 299
quantity = 50
total = product_price * quantity
print(f"类型: {type(product_price)}, 总价: {total}")

# 2. 浮点数 (float)
exchange_rate = 6.89
usd_amount = 1000.00
cny_amount = usd_amount * exchange_rate
print(f"类型: {type(exchange_rate)}, 人民币: {cny_amount:.2f}")

# 3. 字符串 (str)
product_name = "商务数据分析课程"
description = '适合零基础学员'
print(f"类型: {type(product_name)}, 内容: {product_name}")

# 4. 布尔值 (bool)
is_vip = True
has_discount = False
print(f"类型: {type(is_vip)}, 是否VIP: {is_vip}")

# 5. 类型转换
price_str = "199.99"
price_float = float(price_str)
price_int = int(float(price_str))
print(f"字符串转浮点: {price_float}")
print(f"浮点转整数: {price_int}")
</code></pre>
<div class="tip"><strong>💡 提示：</strong>使用 <code>type()</code> 函数可以随时查看变量的数据类型。在数据分析中，经常需要在数值类型和字符串类型之间转换。</div>
<h3>字符串格式化</h3>
<pre><code class="language-python"># f-string 格式化（推荐，Python 3.6+）
name = "张三"
sales = 128500
target = 150000
rate = sales / target * 100

print(f"销售员 {name} 本月销售额: {sales:,} 元")
print(f"完成率: {rate:.1f}%")
print(f"距目标还差: {target - sales:,} 元")

# 常用格式化符号
# :d  - 整数
# :f  - 浮点数
# :.2f - 保留2位小数
# :,  - 千位分隔符
# :%  - 百分比
</code></pre>
<div class="warning"><strong>⚠️ 注意：</strong>Python是动态类型语言，变量的类型可以在运行时改变。但在数据分析中，建议保持变量类型的一致性，避免因类型混用导致计算错误。</div>
        `
      },
      {
        id: 'python-basics-03',
        title: '条件语句与循环',
        type: 'theory',
        duration: 25,
        content: `
<p>条件语句和循环是程序控制流的核心。在数据分析中，我们经常需要根据不同条件执行不同的逻辑，或者对数据进行批量处理。</p>
<h3>条件语句 (if/elif/else)</h3>
<pre><code class="language-python"># 基本条件判断
sales = 128000

if sales >= 200000:
    level = "钻石销售员"
    bonus_rate = 0.15
elif sales >= 150000:
    level = "金牌销售员"
    bonus_rate = 0.10
elif sales >= 100000:
    level = "银牌销售员"
    bonus_rate = 0.05
else:
    level = "见习销售员"
    bonus_rate = 0.02

bonus = sales * bonus_rate
print(f"等级: {level}")
print(f"提成: {bonus:,.0f} 元")
</code></pre>
<h3>比较运算符与逻辑运算符</h3>
<pre><code class="language-python"># 比较运算符
a, b = 100, 200
print(f"a == b: {a == b}")
print(f"a != b: {a != b}")
print(f"a > b: {a > b}")
print(f"a < b: {a < b}")
print(f"a >= b: {a >= b}")
print(f"a <= b: {a <= b}")

# 逻辑运算符
score = 85
attendance = 0.95
print(f"优秀学员: {score >= 80 and attendance >= 0.9}")
print(f"需要补考或重修: {score < 60 or attendance < 0.7}")
print(f"非及格: {not (score >= 60)}")
</code></pre>
<h3>for 循环</h3>
<pre><code class="language-python"># 遍历列表
products = ["笔记本电脑", "平板电脑", "智能手机", "智能手表"]
for product in products:
    print(f"商品: {product}")

# 使用 range() 生成序列
total_revenue = 0
monthly_sales = [120000, 135000, 98000, 156000, 142000, 168000]

for i in range(len(monthly_sales)):
    month = i + 1
    total_revenue += monthly_sales[i]
    print(f"{month}月销售额: {monthly_sales[i]:,} 元")

print(f"上半年总营收: {total_revenue:,} 元")
print(f"月均营收: {total_revenue / len(monthly_sales):,.0f} 元")

# enumerate 同时获取索引和值
for idx, sale in enumerate(monthly_sales, start=1):
    print(f"第{idx}月: {sale:,} 元")
</code></pre>
<h3>while 循环</h3>
<pre><code class="language-python"># while 循环示例：累计销售直到达标
target = 500000
current = 0
month = 0
monthly = [120000, 135000, 98000, 156000, 142000, 168000]

while current < target and month < len(monthly):
    month += 1
    current += monthly[month - 1]
    print(f"第{month}月累计: {current:,} 元")

if current >= target:
    print(f"恭喜！第{month}月达成目标！")
else:
    print(f"未达成目标，还差 {target - current:,} 元")
</code></pre>
<div class="tip"><strong>💡 提示：</strong>在数据分析中，<code>for</code> 循环比 <code>while</code> 循环更常用。但在处理不确定迭代次数的场景（如读取数据直到文件末尾）时，<code>while</code> 循环更加方便。</div>
<div class="warning"><strong>⚠️ 注意：</strong>使用 <code>while</code> 循环时务必确保循环条件最终会变为 <code>False</code>，否则会导致无限循环。建议在循环体内包含使条件趋向终止的逻辑。</div>
        `
      },
      {
        id: 'python-basics-04',
        title: '函数定义',
        type: 'theory',
        duration: 20,
        content: `
<p>函数是组织好的、可重复使用的代码块。在数据分析中，将常用的计算逻辑封装为函数，可以提高代码的复用性和可读性。</p>
<h3>定义和调用函数</h3>
<pre><code class="language-python"># 基本函数定义
def calculate_profit(revenue, cost):
    """计算利润和利润率"""
    profit = revenue - cost
    profit_rate = (profit / revenue) * 100
    return profit, profit_rate

# 调用函数
p, r = calculate_profit(500000, 320000)
print(f"利润: {p:,} 元")
print(f"利润率: {r:.1f}%")
</code></pre>
<h3>默认参数与关键字参数</h3>
<pre><code class="language-python"># 默认参数
def calculate_tax(amount, tax_rate=0.13):
    """计算税额，默认增值税率13%"""
    tax = amount * tax_rate
    return tax

print(f"增值税: {calculate_tax(100000):,.0f} 元")
print(f"企业所得税(25%): {calculate_tax(100000, 0.25):,.0f} 元")

# 关键字参数
def format_report(title, period="月度", unit="元"):
    """生成报告标题"""
    return f"[{period}报告] {title}（单位：{unit}）"

print(format_report("销售业绩"))
print(format_report("年度总结", period="年度"))
print(format_report("利润分析", period="季度", unit="万元"))
</code></pre>
<h3>数据分析常用函数示例</h3>
<pre><code class="language-python"># 计算统计指标
def describe_data(data):
    """返回数据的描述性统计"""
    n = len(data)
    total = sum(data)
    mean = total / n
    sorted_data = sorted(data)
    median = (sorted_data[n // 2] + sorted_data[(n - 1) // 2]) / 2
    return {
        "count": n,
        "sum": total,
        "mean": mean,
        "median": median,
        "min": min(data),
        "max": max(data)
    }

sales = [1200, 3500, 2800, 4100, 1900, 3200, 5600, 2100]
stats = describe_data(sales)
for key, value in stats.items():
    print(f"{key}: {value:,.0f}" if isinstance(value, (int, float)) else f"{key}: {value}")

# 数据标准化函数
def normalize(data):
    """将数据标准化到0-1范围"""
    min_val = min(data)
    max_val = max(data)
    return [(x - min_val) / (max_val - min_val) for x in data]

normalized = normalize(sales)
print(f"\\n标准化后: {[round(x, 3) for x in normalized]}")
</code></pre>
<div class="tip"><strong>💡 提示：</strong>使用三引号 <code>"""</code> 为函数编写文档字符串（docstring），这是Python的最佳实践。好的文档字符串能让其他开发者（包括未来的你）快速理解函数的用途和参数。</div>
<div class="warning"><strong>⚠️ 注意：</strong>函数内部定义的变量是局部变量，不会影响函数外部的同名变量。如果需要在函数内部修改外部变量，需要使用 <code>global</code> 关键字声明，但这通常不推荐，容易导致代码难以维护。</div>
        `
      },
      {
        id: 'python-basics-05',
        title: '列表与字典',
        type: 'practice',
        duration: 30,
        initialCode: `# 商务数据分析练习：列表与字典的综合应用
#
# 场景：你是一家电商公司的数据分析师，需要处理以下销售数据

# TODO 1: 创建一个包含5个商品名称的列表
products = []

# TODO 2: 创建一个包含对应价格的列表
prices = []

# TODO 3: 创建一个包含对应销量的列表
quantities = []

# TODO 4: 计算每个商品的销售额，存入新列表 sales_amounts
sales_amounts = []

# TODO 5: 找出销售额最高的商品，输出其名称和销售额
best_product = ""
best_sales = 0

# TODO 6: 计算总销售额和平均销售额
total_sales = 0
avg_sales = 0

# TODO 7: 使用字典存储商品信息，格式如下：
# product_info = {"商品名": {"price": 价格, "quantity": 销量, "sales": 销售额}, ...}
product_info = {}

# TODO 8: 筛选出销售额大于平均值的商品
above_avg_products = []

# === 输出结果 ===
print("=" * 50)
print("商品销售分析报告")
print("=" * 50)
print(f"\\n商品列表: {products}")
print(f"\\n各商品销售额:")
for i, name in enumerate(products):
    print(f"  {name}: {sales_amounts[i]:,.0f} 元")
print(f"\\n销售额最高: {best_product} ({best_sales:,.0f} 元)")
print(f"总销售额: {total_sales:,.0f} 元")
print(f"平均销售额: {avg_sales:,.0f} 元")
print(f"\\n高于平均的商品: {above_avg_products}")
print(f"\\n商品信息字典:")
for name, info in product_info.items():
    print(f"  {name}: 价格{info['price']}元, 销量{info['quantity']}件, 销售额{info['sales']:,.0f}元")
`,
        expectedOutput: `==================================================\n商品销售分析报告\n==================================================\n\n商品列表: ['笔记本电脑', '无线耳机', '机械键盘', '显示器', '鼠标垫']\n\n各商品销售额:\n  笔记本电脑: 599,000 元\n  无线耳机: 89,600 元\n  机械键盘: 149,500 元\n  显示器: 328,000 元\n  鼠标垫: 14,850 元\n\n销售额最高: 笔记本电脑 (599,000 元)\n总销售额: 1,180,950 元\n平均销售额: 236,190 元\n\n高于平均的商品: ['笔记本电脑', '显示器']\n\n商品信息字典:\n  笔记本电脑: 价格5990元, 销量100件, 销售额599,000元\n  无线耳机: 价格299元, 销量300件, 销售额89,600元\n  机械键盘: 价格599元, 销量250件, 销售额149,500元\n  显示器: 价格3280元, 销量100件, 销售额328,000元\n  鼠标垫: 价格99元, 销量150件, 销售额14,850元`,
        hints: [
          '使用列表字面量创建列表，例如 products = ["笔记本电脑", "无线耳机", ...]',
          '使用 zip() 函数可以同时遍历多个列表，或使用索引 range(len())',
          '计算最高销售额时，可以遍历列表并使用 if 语句比较',
          '字典的键值对格式为 {"key": value}，嵌套字典可以多层嵌套',
          '使用列表推导式可以简洁地筛选数据，例如 [x for x in data if x > avg]'
        ],
        testCases: [
          { input: '', expected: '商品销售分析报告' }
        ]
      },
      {
        id: 'python-basics-06',
        title: '字符串操作',
        type: 'practice',
        duration: 25,
        initialCode: `# 商务数据分析练习：字符串处理
#
# 场景：你需要清洗和整理一批客户数据

# 原始数据（包含格式不统一的问题）
raw_customers = [
    "  张三  | zhangsan@email.com | 北京 | VIP  ",
    "李四|lisi@email.com|上海|普通",
    "  王五 | wangwu@email.com | 广州 | VIP  ",
    "赵六|zhaoliu@email.com|深圳|普通",
    "  钱七  | qianqi@email.com |  杭州 | VIP  "
]

# TODO 1: 编写函数 parse_customer(raw_string)，解析每条客户记录
# 返回字典格式：{"name": 姓名, "email": 邮箱, "city": 城市, "level": 等级}
def parse_customer(raw_string):
    # 提示：使用 split("|") 分割，strip() 去除空格
    pass

# TODO 2: 解析所有客户数据，存入列表 customers
customers = []

# TODO 3: 统计各城市的客户数量
city_count = {}

# TODO 4: 统计VIP客户数量和普通客户数量
vip_count = 0
normal_count = 0

# TODO 5: 找出所有来自"一线城市"（北京、上海、广州、深圳）的客户

# === 输出结果 ===
print("=" * 50)
print("客户数据分析报告")
print("=" * 50)
print(f"\\n解析后的客户数据:")
for c in customers:
    print(f"  {c['name']} | {c['email']} | {c['city']} | {c['level']}")

print(f"\\n各城市客户数量: {city_count}")
print(f"VIP客户: {vip_count}人, 普通客户: {normal_count}人")
print(f"\\n一线城市客户:")
for c in customers:
    if c['city'] in ['北京', '上海', '广州', '深圳']:
        print(f"  {c['name']} ({c['city']})")
`,
        expectedOutput: `==================================================\n客户数据分析报告\n==================================================\n\n解析后的客户数据:\n  张三 | zhangsan@email.com | 北京 | VIP\n  李四 | lisi@email.com | 上海 | 普通\n  王五 | wangwu@email.com | 广州 | VIP\n  赵六 | zhaoliu@email.com | 深圳 | 普通\n  钱七 | qianqi@email.com | 杭州 | VIP\n\n各城市客户数量: {'北京': 1, '上海': 1, '广州': 1, '深圳': 1, '杭州': 1}\nVIP客户: 3人, 普通客户: 2人\n\n一线城市客户:\n  张三 (北京)\n  李四 (上海)\n  王五 (广州)\n  赵六 (深圳)`,
        hints: [
          '使用 strip() 去除字符串两端的空格',
          '使用 split("|") 按 | 符号分割字符串',
          '遍历字典更新计数时，使用 dict.get(key, 0) + 1 的方式',
          '字符串的 lower() 方法可以将所有字符转为小写'
        ],
        testCases: [
          { input: '', expected: '客户数据分析报告' }
        ]
      },
      {
        id: 'python-basics-07',
        title: 'Python基础测验',
        type: 'quiz',
        duration: 15,
        questions: [
          {
            question: '以下哪个是合法的Python变量名？',
            options: ['2sales', 'my-var', 'sales_2024', 'class'],
            correct: 2,
            explanation: '变量名不能以数字开头（排除2sales），不能包含连字符（排除my-var），不能使用Python关键字（排除class）。sales_2024是合法的变量名。'
          },
          {
            question: '执行 print(type(3.14)) 的输出结果是什么？',
            options: ["<class 'int'>", "<class 'float'>", "<class 'str'>", "<class 'decimal'>"],
            correct: 1,
            explanation: '3.14 是一个浮点数，在Python中浮点数的数据类型是 float。'
          },
          {
            question: '以下代码的输出结果是什么？\nfor i in range(1, 6, 2):\n    print(i, end=" ")',
            options: ['1 2 3 4 5', '1 3 5', '0 2 4', '1 2 3'],
            correct: 1,
            explanation: 'range(1, 6, 2) 生成从1开始、步长为2的序列，即 1, 3, 5。当值达到或超过6时停止。'
          },
          {
            question: '以下哪个函数可以将字符串 "123" 转换为整数？',
            options: ['str(123)', 'int("123")', 'float("123")', 'num("123")'],
            correct: 1,
            explanation: 'int() 函数用于将字符串或浮点数转换为整数。str() 是转为字符串，float() 是转为浮点数，num() 不是Python内置函数。'
          },
          {
            question: '在Python中，以下哪种方式可以正确创建一个空字典？',
            options: ['dict = []', 'dict = {}', 'dict = ()', 'dict = set()'],
            correct: 1,
            explanation: '{} 创建空字典，[] 创建空列表，() 创建空元组，set() 创建空集合。注意空集合必须用 set() 而非 {}（{} 创建的是空字典）。'
          }
        ]
      }
    ]
  },
  // ============================================================
  // 课程2：Pandas数据处理
  // ============================================================
  {
    id: 'pandas-fundamentals',
    title: 'Pandas数据处理',
    icon: '🐼',
    difficulty: 'beginner',
    description: '学习使用Pandas库进行高效的数据处理与分析',
    category: '数据处理',
    lessons: [
      {
        id: 'pandas-fundamentals-01',
        title: 'Pandas简介与Series',
        type: 'theory',
        duration: 20,
        content: '<p>Pandas是Python中最核心的数据分析库，它提供了两种主要数据结构：Series（一维）和DataFrame（二维）。掌握Pandas是进行商务数据分析的关键一步。</p>\n<h3>导入Pandas</h3>\n<pre><code class="language-python">import pandas as pd\nimport numpy as np\n\nprint(f"Pandas版本: {pd.__version__}")\nprint("Pandas已准备就绪！")\n</code></pre>\n<h3>Series：一维数据结构</h3>\n<p>Series类似于带索引的一维数组，可以存储任何数据类型。</p>\n<pre><code class="language-python"># 从列表创建Series\nsales = pd.Series([1200, 3500, 2800, 4100, 1900, 3200])\nprint("基本Series:")\nprint(sales)\n\n# 指定索引\nmonths = [\'1月\', \'2月\', \'3月\', \'4月\', \'5月\', \'6月\']\nsales = pd.Series([1200, 3500, 2800, 4100, 1900, 3200], index=months)\nprint("\\n带索引的Series:")\nprint(sales)\n\n# 从字典创建Series\ndata = {\'北京\': 52800, \'上海\': 48600, \'广州\': 35200, \'深圳\': 41000}\ncity_sales = pd.Series(data)\nprint("\\n从字典创建:")\nprint(city_sales)\n</code></pre>\n<h3>Series基本操作</h3>\n<pre><code class="language-python"># 基本属性\nprint(f"值: {sales.values}")\nprint(f"索引: {sales.index.tolist()}")\nprint(f"数据类型: {sales.dtype}")\n\n# 统计方法\nprint(f"\\n总和: {sales.sum():,}")\nprint(f"均值: {sales.mean():,.0f}")\nprint(f"最大值: {sales.max():,}")\nprint(f"标准差: {sales.std():,.0f}")\n\n# 索引与切片\nprint(f"\\n1月销售额: {sales[\'1月\']:,}")\nprint(f"大于3000的月份:\\n{sales[sales > 3000]}")\n\n# 向量化运算\nbonus = sales * 0.1\nprint(f"\\n提成金额:\\n{bonus}")\n\n# 排序\nprint(f"\\n降序排列:\\n{sales.sort_values(ascending=False)}")\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>Series支持向量化运算，可以直接对整个Series进行数学运算，无需编写循环。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>Series的索引可以是任意类型，但建议使用有意义的标签作为索引。</div>'
      },
      {
        id: 'pandas-fundamentals-02',
        title: 'DataFrame基础',
        type: 'theory',
        duration: 25,
        content: '<p>DataFrame是Pandas中最常用的数据结构，它是一个二维表格，类似于Excel电子表格或SQL数据库表。</p>\n<h3>创建DataFrame</h3>\n<pre><code class="language-python">import pandas as pd\n\ndata = {\n    \'产品\': [\'笔记本电脑\', \'无线耳机\', \'机械键盘\', \'显示器\', \'鼠标垫\'],\n    \'单价\': [5990, 299, 599, 3280, 99],\n    \'销量\': [100, 300, 250, 100, 150],\n    \'类别\': [\'电子产品\', \'配件\', \'配件\', \'电子产品\', \'配件\']\n}\n\ndf = pd.DataFrame(data)\nprint("完整DataFrame:")\nprint(df)\nprint(f"\\n形状: {df.shape}")\nprint(f"列名: {df.columns.tolist()}")\n</code></pre>\n<h3>DataFrame基本操作</h3>\n<pre><code class="language-python"># 查看数据\nprint("前3行:")\nprint(df.head(3))\n\n# 计算销售额\ndf[\'销售额\'] = df[\'单价\'] * df[\'销量\']\nprint("\\n添加销售额列:")\nprint(df)\n\n# 选择列\nprint("\\n选择多列:")\nprint(df[[\'产品\', \'销售额\']])\n\n# 条件筛选\nprint("\\n销售额大于10万的商品:")\nprint(df[df[\'销售额\'] > 100000])\n\n# 新增和删除列\ndf[\'利润率\'] = [0.15, 0.25, 0.20, 0.12, 0.30]\ndf[\'利润\'] = df[\'销售额\'] * df[\'利润率\']\ndf_renamed = df.rename(columns={\'单价\': \'价格\', \'销量\': \'销售数量\'})\nprint("\\n重命名列后:")\nprint(df_renamed)\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>使用 <code>df.info()</code> 可以快速了解DataFrame的整体情况。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>大多数Pandas操作返回新的DataFrame，如需原地修改请使用 <code>inplace=True</code> 或重新赋值。</div>'
      },
      {
        id: 'pandas-fundamentals-03',
        title: '数据读取与查看',
        type: 'theory',
        duration: 20,
        content: '<p>在实际工作中，数据通常存储在外部文件中。Pandas支持读取多种格式的数据文件。</p>\n<h3>读取CSV文件</h3>\n<pre><code class="language-python">import pandas as pd\nimport io\n\ncsv_data = """日期,产品,销售额,数量,地区\n2024-01-15,笔记本电脑,59900,10,北京\n2024-01-16,无线耳机,8970,30,上海\n2024-01-17,机械键盘,14975,25,广州\n2024-01-18,显示器,65600,20,深圳\n2024-01-19,笔记本电脑,119800,20,北京"""\n\ndf = pd.read_csv(io.StringIO(csv_data))\nprint("读取的CSV数据:")\nprint(df)\nprint(f"\\n形状: {df.shape}")\n</code></pre>\n<h3>查看数据的方法</h3>\n<pre><code class="language-python">print("前5行:")\nprint(df.head())\nprint("\\n描述性统计:")\nprint(df.describe())\nprint("\\n产品种类:", df[\'产品\'].unique().tolist())\nprint("地区分布:", df[\'地区\'].value_counts().to_dict())\n</code></pre>\n<h3>读取其他格式</h3>\n<pre><code class="language-python"># 读取JSON\njson_data = \'[{"name": "张三", "sales": 150000}, {"name": "李四", "sales": 120000}]\'\ndf_json = pd.read_json(io.StringIO(json_data))\nprint("JSON数据:", df_json.to_dict(\'records\'))\n\n# 读取Excel\n# df_excel = pd.read_excel(\'data.xlsx\', sheet_name=\'Sheet1\')\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong><code>pd.read_csv()</code> 常用参数：<code>encoding</code>（编码）、<code>skiprows</code>（跳过行）、<code>nrows</code>（读取行数）、<code>parse_dates</code>（解析日期）。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>读取中文CSV出现乱码时，尝试 <code>encoding=\'gbk\'</code> 或 <code>encoding=\'utf-8-sig\'</code>。</div>'
      },
      {
        id: 'pandas-fundamentals-04',
        title: '数据筛选与过滤',
        type: 'theory',
        duration: 25,
        content: '<p>数据筛选是数据分析中最常用的操作之一。Pandas提供了多种灵活的方式来筛选数据。</p>\n<h3>条件筛选</h3>\n<pre><code class="language-python">import pandas as pd\nimport numpy as np\n\ndata = {\n    \'员工\': [\'张三\', \'李四\', \'王五\', \'赵六\', \'钱七\', \'孙八\', \'周九\', \'吴十\'],\n    \'部门\': [\'销售部\', \'技术部\', \'销售部\', \'市场部\', \'技术部\', \'销售部\', \'市场部\', \'技术部\'],\n    \'月薪\': [15000, 22000, 12000, 18000, 25000, 11000, 16000, 20000],\n    \'绩效\': [85, 92, 78, 88, 95, 72, 82, 90],\n    \'工龄\': [3, 5, 2, 4, 6, 1, 3, 5]\n}\ndf = pd.DataFrame(data)\n\n# 单条件\nprint("月薪>18000:", df[df[\'月薪\'] > 18000][[\'员工\', \'月薪\']].to_string(index=False))\n\n# 多条件AND\nprint("\\n销售部且绩效>=80:")\nprint(df[(df[\'部门\'] == \'销售部\') & (df[\'绩效\'] >= 80)][[\'员工\', \'绩效\']].to_string(index=False))\n\n# 多条件OR\nprint("\\n工龄>=5或月薪>=20000:")\nprint(df[(df[\'工龄\'] >= 5) | (df[\'月薪\'] >= 20000)][[\'员工\', \'月薪\', \'工龄\']].to_string(index=False))\n\n# isin筛选\nprint("\\n销售部和市场部:", df[df[\'部门\'].isin([\'销售部\', \'市场部\'])][\'员工\'].tolist())\n\n# between筛选\nprint("月薪15000-20000:", df[df[\'月薪\'].between(15000, 20000)][\'员工\'].tolist())\n</code></pre>\n<h3>loc 和 iloc</h3>\n<pre><code class="language-python"># loc - 基于标签\nprint("loc选择:", df.loc[0:3, [\'员工\', \'月薪\', \'绩效\']].to_string(index=False))\n\n# loc + 条件\nprint("\\nloc条件:", df.loc[df[\'绩效\'] > 85, [\'员工\', \'部门\', \'绩效\']].to_string(index=False))\n\n# iloc - 基于位置\nprint("\\niloc前3行前3列:")\nprint(df.iloc[0:3, 0:3].to_string(index=False))\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>Pandas中 <code>&</code>、<code>|</code>、<code>~</code> 分别表示与、或、非。每个条件必须用圆括号包裹。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>条件筛选返回视图，如需独立副本请使用 <code>.copy()</code>。</div>'
      },
      {
        id: 'pandas-fundamentals-05',
        title: '数据排序与分组',
        type: 'practice',
        duration: 30,
        initialCode: 'import pandas as pd\nimport numpy as np\n\ndata = {\n    \'月份\': [\'1月\',\'1月\',\'1月\',\'2月\',\'2月\',\'2月\',\'3月\',\'3月\',\'3月\',\n             \'4月\',\'4月\',\'4月\',\'5月\',\'5月\',\'5月\',\'6月\',\'6月\',\'6月\'],\n    \'部门\': [\'华东区\',\'华南区\',\'华北区\']*6,\n    \'销售额\': [45200, 38600, 42100, 51300, 42800, 39500, 48700, 45200, 44100,\n               55800, 47300, 41200, 52100, 49600, 46800, 58200, 51400, 48900],\n    \'订单数\': [152, 128, 140, 171, 143, 132, 162, 151, 147,\n               186, 158, 137, 174, 165, 156, 194, 171, 163],\n    \'成本\': [31640, 27020, 29470, 35910, 29960, 27650, 34090, 31640, 30870,\n             39060, 33110, 28840, 36470, 34720, 32760, 40740, 35980, 34230]\n}\ndf = pd.DataFrame(data)\n\n# TODO 1: 计算利润和利润率\n# TODO 2: 按销售额降序排列，显示前5条\n# TODO 3: 按部门分组统计\n# TODO 4: 按月份分组统计\n# TODO 5: 创建部门月度透视表\n# TODO 6: 找出最佳销售记录\n\nprint("=" * 60)\nprint("销售数据分析报告")\nprint("=" * 60)\n',
        expectedOutput: '销售数据分析报告',
        hints: ['利润 = 销售额 - 成本', '使用 sort_values() 排序', '使用 groupby().agg() 分组聚合', '使用 pivot_table() 创建透视表'],
        testCases: [{ input: '', expected: '销售数据分析报告' }]
      },
      {
        id: 'pandas-fundamentals-06',
        title: '缺失值处理',
        type: 'practice',
        duration: 25,
        initialCode: 'import pandas as pd\nimport numpy as np\n\ndata = {\n    \'客户ID\': [\'C001\', \'C002\', \'C003\', \'C004\', \'C005\', \'C006\', \'C007\', \'C008\'],\n    \'姓名\': [\'张三\', \'李四\', None, \'赵六\', \'钱七\', \'孙八\', None, \'周九\'],\n    \'年龄\': [28, 35, np.nan, 42, 31, np.nan, 26, 38],\n    \'城市\': [\'北京\', \'上海\', \'广州\', None, \'北京\', \'上海\', \'广州\', None],\n    \'消费金额\': [5280, 3120, 4500, np.nan, 6800, 2100, np.nan, 3950],\n    \'会员等级\': [\'金牌\', \'银牌\', \'金牌\', None, \'钻石\', \'银牌\', None, \'金牌\']\n}\ndf = pd.DataFrame(data)\n\n# TODO 1: 检查缺失值\n# TODO 2: 删除姓名为空的行\n# TODO 3: 用均值填充年龄，"未知"填充城市，中位数填充消费金额，众数填充会员等级\n# TODO 4: 添加消费等级列\n# TODO 5: 验证无缺失值\n\nprint("=" * 60)\nprint("缺失值处理报告")\nprint("=" * 60)\n',
        expectedOutput: '缺失值处理报告',
        hints: ['使用 isnull().sum() 检查缺失值', '使用 dropna() 删除空值行', '使用 fillna() 填充缺失值', '使用 mode()[0] 获取众数'],
        testCases: [{ input: '', expected: '缺失值处理报告' }]
      },
      {
        id: 'pandas-fundamentals-07',
        title: 'Pandas基础测验',
        type: 'quiz',
        duration: 15,
        questions: [
          { question: '以下哪种方式可以正确创建一个DataFrame？', options: ['pd.DataFrame([1, 2, 3])', 'pd.DataFrame({"A": [1, 2], "B": [3, 4]})', 'pd.DataFrame("A B")', 'pd.DataFrame((1, 2, 3))'], correct: 1, explanation: '最常用的创建DataFrame的方式是传入字典。' },
          { question: 'df.describe() 方法默认只对哪种类型的列进行统计？', options: ['所有列', '数值型列', '字符串列', '日期列'], correct: 1, explanation: 'df.describe() 默认只对数值型列计算统计指标。' },
          { question: '以下哪个表达式可以筛选出"销售额"列大于10000的所有行？', options: ['df["销售额" > 10000]', 'df[df["销售额"] > 10000]', 'df.where("销售额" > 10000)', 'df.filter("销售额" > 10000)'], correct: 1, explanation: '使用布尔索引 df[df["销售额"] > 10000] 筛选行。' },
          { question: 'df.groupby("部门")["销售额"].mean() 的作用是什么？', options: ['计算所有销售额的平均值', '按部门分组后计算每组的销售额平均值', '按销售额排序', '筛选销售额大于平均值的记录'], correct: 1, explanation: 'groupby按部门分组，mean()计算每组的平均值。' },
          { question: '以下哪种方法最适合处理DataFrame中少量的缺失值？', options: ['直接删除所有含缺失值的行', '使用 fillna() 用合理值填充', '忽略缺失值不做处理', '将缺失值替换为0'], correct: 1, explanation: '使用 fillna() 用合理值填充是处理少量缺失值的最佳实践。' }
        ]
      }
    ]
  },
  // ============================================================
  // 课程3：数据可视化
  // ============================================================
  {
    id: 'data-visualization',
    title: '数据可视化',
    icon: '📊',
    difficulty: 'intermediate',
    description: '掌握Matplotlib和Seaborn，用图表讲述数据故事',
    category: '数据可视化',
    lessons: [
      {
        id: 'data-visualization-01',
        title: 'Matplotlib基础',
        type: 'theory',
        duration: 25,
        content: '<p>数据可视化是数据分析中不可或缺的环节。Matplotlib是Python中最基础、最强大的绘图库。</p>\n<h3>导入与基本设置</h3>\n<pre><code class="language-python">import matplotlib.pyplot as plt\nimport matplotlib\nmatplotlib.use(\'Agg\')  # 非交互式后端\nimport numpy as np\n\nplt.rcParams[\'font.sans-serif\'] = [\'SimHei\', \'DejaVu Sans\']\nplt.rcParams[\'axes.unicode_minus\'] = False\nplt.style.use(\'seaborn-v0_8-whitegrid\')\nprint("Matplotlib已准备就绪！")\n</code></pre>\n<h3>基本图表结构</h3>\n<pre><code class="language-python">fig, ax = plt.subplots(figsize=(10, 6))\n\nmonths = [\'1月\', \'2月\', \'3月\', \'4月\', \'5月\', \'6月\']\nsales = [120, 135, 98, 156, 142, 168]\n\nax.plot(months, sales, marker=\'o\', linewidth=2, markersize=8,\n        color=\'#2196F3\', label=\'月度销售额\')\nax.set_title(\'2024年上半年销售趋势\', fontsize=16, fontweight=\'bold\')\nax.set_xlabel(\'月份\', fontsize=12)\nax.set_ylabel(\'销售额（万元）\', fontsize=12)\nax.grid(True, alpha=0.3)\nax.legend(fontsize=11)\n\nfor i, v in enumerate(sales):\n    ax.text(i, v + 3, f\'{v}\', ha=\'center\', fontsize=10)\n\nplt.tight_layout()\nplt.savefig(\'sales_trend.png\', dpi=150, bbox_inches=\'tight\')\nplt.close()\nprint("图表已保存！")\n</code></pre>\n<h3>常用图表元素</h3>\n<pre><code class="language-python">fig, axes = plt.subplots(1, 2, figsize=(14, 5))\n\n# 柱状图 + 标注\nax1 = axes[0]\nx = np.arange(1, 7)\ny = np.array([120, 135, 98, 156, 142, 168])\nax1.bar(x, y, color=[\'#4CAF50\' if v >= 130 else \'#FF9800\' for v in y])\nax1.set_title(\'月度销售额\', fontsize=14)\nax1.set_xticks(x)\nax1.set_xticklabels([\'1月\', \'2月\', \'3月\', \'4月\', \'5月\', \'6月\'])\nmax_idx = np.argmax(y)\nax1.annotate(f\'最高: {y[max_idx]}万\', xy=(max_idx+1, y[max_idx]),\n             xytext=(max_idx+1.5, y[max_idx]+10),\n             arrowprops=dict(arrowstyle=\'->\', color=\'red\'), fontsize=11, color=\'red\')\n\n# 堆叠面积图\nax2 = axes[1]\np_a = np.array([50, 55, 45, 65, 60, 70])\np_b = np.array([40, 45, 35, 50, 48, 55])\np_c = np.array([30, 35, 18, 41, 34, 43])\nax2.stackplot(np.arange(1,7), p_a, p_b, p_c,\n              labels=[\'产品A\', \'产品B\', \'产品C\'],\n              colors=[\'#2196F3\', \'#4CAF50\', \'#FF9800\'], alpha=0.8)\nax2.set_title(\'产品销售构成\', fontsize=14)\nax2.legend(loc=\'upper left\')\n\nplt.tight_layout()\nplt.savefig(\'chart_elements.png\', dpi=150, bbox_inches=\'tight\')\nplt.close()\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>Matplotlib的绘图流程：创建画布 -> 绘制图形 -> 添加装饰 -> 保存/显示。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>在网页环境中使用 <code>matplotlib.use(\'Agg\')</code> 设置非交互式后端。</div>'
      },
      {
        id: 'data-visualization-02',
        title: '折线图与柱状图',
        type: 'theory',
        duration: 25,
        content: '<p>折线图适合展示数据随时间的变化趋势，柱状图适合比较不同类别之间的数值差异。</p>\n<h3>折线图：多系列对比</h3>\n<pre><code class="language-python">import matplotlib.pyplot as plt\nimport matplotlib\nmatplotlib.use(\'Agg\')\nimport numpy as np\n\nplt.style.use(\'seaborn-v0_8-whitegrid\')\nfig, ax = plt.subplots(figsize=(12, 6))\n\nmonths = [\'1月\', \'2月\', \'3月\', \'4月\', \'5月\', \'6月\', \'7月\', \'8月\', \'9月\', \'10月\', \'11月\', \'12月\']\nsales_2023 = [85, 92, 78, 105, 112, 98, 120, 115, 108, 125, 130, 142]\nsales_2024 = [95, 108, 95, 118, 128, 115, 138, 132, 125, 145, 152, 168]\n\nax.plot(months, sales_2023, marker=\'s\', linewidth=2.5, markersize=7,\n        color=\'#90CAF9\', label=\'2023年\', linestyle=\'--\')\nax.plot(months, sales_2024, marker=\'o\', linewidth=2.5, markersize=7,\n        color=\'#1565C0\', label=\'2024年\')\nax.fill_between(months, sales_2023, sales_2024, alpha=0.15, color=\'#1565C0\')\n\nax.set_title(\'2023 vs 2024 月度销售额对比\', fontsize=16, fontweight=\'bold\')\nax.set_xlabel(\'月份\', fontsize=12)\nax.set_ylabel(\'销售额（万元）\', fontsize=12)\nax.legend(fontsize=12, loc=\'upper left\')\nax.set_ylim(60, 180)\n\nplt.tight_layout()\nplt.savefig(\'line_comparison.png\', dpi=150, bbox_inches=\'tight\')\nplt.close()\n</code></pre>\n<h3>柱状图：分类比较</h3>\n<pre><code class="language-python">fig, axes = plt.subplots(1, 2, figsize=(14, 6))\n\n# 水平柱状图\nax1 = axes[0]\ndeps = [\'华东区\', \'华南区\', \'华北区\', \'西南区\', \'华中区\']\nrev = [528, 412, 386, 295, 348]\ncolors = [\'#1976D2\', \'#388E3C\', \'#F57C00\', \'#7B1FA2\', \'#C62828\']\nbars = ax1.barh(deps, rev, color=colors, height=0.6, edgecolor=\'white\')\nax1.set_title(\'各区营收对比\', fontsize=14)\nfor bar, val in zip(bars, rev):\n    ax1.text(val + 5, bar.get_y() + bar.get_height()/2, f\'{val}万\', va=\'center\', fontsize=11)\n\n# 分组柱状图\nax2 = axes[1]\nquarters = [\'Q1\', \'Q2\', \'Q3\', \'Q4\']\nonline = [320, 380, 420, 510]\noffline = [280, 250, 230, 190]\nx = np.arange(len(quarters))\nwidth = 0.35\nax2.bar(x - width/2, online, width, label=\'线上渠道\', color=\'#2196F3\')\nax2.bar(x + width/2, offline, width, label=\'线下渠道\', color=\'#FF9800\')\nax2.set_title(\'线上线下渠道对比\', fontsize=14)\nax2.set_xticks(x)\nax2.set_xticklabels(quarters)\nax2.legend(fontsize=11)\n\nplt.tight_layout()\nplt.savefig(\'bar_charts.png\', dpi=150, bbox_inches=\'tight\')\nplt.close()\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>类别名称较长时使用水平柱状图（barh），比较多个系列时使用分组柱状图。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>柱状图Y轴通常从0开始，否则会夸大差异。</div>'
      },
      {
        id: 'data-visualization-03',
        title: '散点图与饼图',
        type: 'practice',
        duration: 30,
        initialCode: 'import matplotlib.pyplot as plt\nimport matplotlib\nmatplotlib.use(\'Agg\')\nimport numpy as np\n\nplt.style.use(\'seaborn-v0_8-whitegrid\')\n\nnp.random.seed(42)\nad_budget = np.array([5, 10, 15, 20, 25, 30, 35, 40, 45, 50,\n                      8, 12, 18, 22, 28, 33, 38, 42, 48, 55])\nsales = ad_budget * 2.5 + np.random.normal(0, 15, len(ad_budget))\nsales = np.maximum(sales, 10)\n\nmarket_data = {\'品牌\': [\'品牌A\', \'品牌B\', \'品牌C\', \'品牌D\', \'其他\'], \'份额\': [35, 25, 20, 12, 8]}\n\n# TODO 1: 创建散点图（广告投入 vs 销售额），添加趋势线\nfig1, ax1 = plt.subplots(figsize=(10, 6))\n\n# TODO 2: 创建饼图（市场份额），突出最大品牌\nfig2, ax2 = plt.subplots(figsize=(8, 8))\n\n# TODO 3: 创建气泡图（广告投入 vs 销售额 vs 利润率）\nprofit_rate = np.random.uniform(10, 30, len(ad_budget))\nfig3, ax3 = plt.subplots(figsize=(10, 7))\n\nplt.close(\'all\')\nprint("所有图表已生成！")\nprint("散点图: scatter_plot.png")\nprint("饼图: pie_chart.png")\nprint("气泡图: bubble_chart.png")\n',
        expectedOutput: '所有图表已生成！',
        hints: ['使用 ax.scatter(x, y, s=size, c=color, alpha=0.6)', '使用 np.polyfit(x, y, 1) 拟合趋势线', '使用 ax.pie(data, labels=labels, autopct=\'%.1f%%\')', '气泡图使用 s 参数控制大小'],
        testCases: [{ input: '', expected: '所有图表已生成' }]
      },
      {
        id: 'data-visualization-04',
        title: 'Seaborn高级可视化',
        type: 'theory',
        duration: 25,
        content: '<p>Seaborn是基于Matplotlib的高级可视化库，提供了更简洁的API和更美观的默认样式。</p>\n<h3>Seaborn基础</h3>\n<pre><code class="language-python">import seaborn as sns\nimport matplotlib.pyplot as plt\nimport matplotlib\nmatplotlib.use(\'Agg\')\nimport pandas as pd\nimport numpy as np\n\nsns.set_theme(style="whitegrid", font_scale=1.2)\n\nnp.random.seed(42)\nn = 200\ndf = pd.DataFrame({\n    \'月消费\': np.random.exponential(500, n).round(0),\n    \'年龄\': np.random.randint(18, 65, n),\n    \'会员等级\': np.random.choice([\'普通\', \'银牌\', \'金牌\', \'钻石\'], n, p=[0.4, 0.3, 0.2, 0.1]),\n    \'性别\': np.random.choice([\'男\', \'女\'], n),\n    \'满意度\': np.random.randint(1, 6, n)\n})\nprint(df.head())\n</code></pre>\n<h3>分布可视化</h3>\n<pre><code class="language-python">fig, axes = plt.subplots(1, 2, figsize=(14, 5))\n\nsns.histplot(data=df, x=\'月消费\', bins=30, kde=True, color=\'#2196F3\', ax=axes[0])\naxes[0].set_title(\'月消费金额分布\', fontsize=14)\naxes[0].axvline(df[\'月消费\'].mean(), color=\'red\', linestyle=\'--\', label=f\'均值: {df["月消费"].mean():.0f}\')\naxes[0].legend()\n\nsns.boxplot(data=df, x=\'会员等级\', y=\'月消费\', palette=\'Set2\', ax=axes[1],\n            order=[\'普通\', \'银牌\', \'金牌\', \'钻石\'])\naxes[1].set_title(\'各会员等级消费分布\', fontsize=14)\n\nplt.tight_layout()\nplt.savefig(\'seaborn_distribution.png\', dpi=150, bbox_inches=\'tight\')\nplt.close()\n</code></pre>\n<h3>关系可视化</h3>\n<pre><code class="language-python">fig, axes = plt.subplots(1, 2, figsize=(14, 5))\n\nsns.scatterplot(data=df, x=\'年龄\', y=\'月消费\', hue=\'会员等级\',\n                palette=\'deep\', size=\'满意度\', sizes=(30, 150), ax=axes[0])\naxes[0].set_title(\'年龄与消费关系\', fontsize=14)\n\ncorr = df[[\'月消费\', \'年龄\', \'满意度\']].corr()\nsns.heatmap(corr, annot=True, cmap=\'RdYlBu_r\', center=0, fmt=\'.2f\', square=True, ax=axes[1])\naxes[1].set_title(\'变量相关性热力图\', fontsize=14)\n\nplt.tight_layout()\nplt.savefig(\'seaborn_relation.png\', dpi=150, bbox_inches=\'tight\')\nplt.close()\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>Seaborn一行代码就能创建美观的统计图表。使用 <code>sns.set_theme()</code> 全局设置风格。</div>\n<div class="warning"><strong>⚠️ 注意：</strong><code>hue</code> 参数用于按类别分组显示不同颜色，确保分组变量是离散型的。</div>'
      },
      {
        id: 'data-visualization-05',
        title: '数据可视化测验',
        type: 'quiz',
        duration: 15,
        questions: [
          { question: '展示数据随时间变化的趋势，最适合使用哪种图表？', options: ['饼图', '折线图', '散点图', '箱线图'], correct: 1, explanation: '折线图能清晰地展示数据随时间的变化趋势。' },
          { question: '在Matplotlib中，plt.subplots(2, 3) 会创建什么样的布局？', options: ['2行3列共6个子图', '3行2列共6个子图', '2个图3个轴', '1行6列共6个子图'], correct: 0, explanation: '第一个参数是行数，第二个参数是列数。' },
          { question: '以下哪种图表最适合展示各部分占整体的比例？', options: ['柱状图', '散点图', '饼图', '折线图'], correct: 2, explanation: '饼图通过扇形面积直观展示各部分占整体的比例。' },
          { question: 'Seaborn相比Matplotlib的主要优势是什么？', options: ['绘图速度更快', '默认样式更美观，统计图表API更简洁', '支持更多图表类型', '不需要安装其他依赖'], correct: 1, explanation: 'Seaborn提供了更美观的默认样式和更简洁的高级API。' },
          { question: '箱线图（Box Plot）中，箱体表示的是什么？', options: ['数据的最大值和最小值范围', '数据的四分位距（IQR）', '数据的均值加减一个标准差', '数据的中位数到最大值的范围'], correct: 1, explanation: '箱体表示Q1到Q3之间的四分位距（IQR）。' }
        ]
      }
    ]
  },
  // ============================================================
  // 课程4：统计分析基础
  // ============================================================
  {
    id: 'statistics-fundamentals',
    title: '统计分析基础',
    icon: '📈',
    difficulty: 'intermediate',
    description: '学习描述性统计、概率分布和假设检验等核心统计方法',
    category: '统计分析',
    lessons: [
      {
        id: 'statistics-fundamentals-01',
        title: '描述性统计',
        type: 'theory',
        duration: 25,
        content: '<p>描述性统计是数据分析的基础，通过计算统计指标来概括数据的基本特征。</p>\n<h3>集中趋势度量</h3>\n<pre><code class="language-python">import numpy as np\n\nsalaries = [8500, 9200, 7800, 12000, 15000, 8800, 9500, 11000,\n            7600, 13500, 9000, 10500, 8200, 9800, 11500, 8000, 12800, 9300, 10200, 8700]\nn = len(salaries)\n\nmean_salary = sum(salaries) / n\nprint(f"样本量: {n}, 均值: {mean_salary:,.0f} 元")\n\nsorted_s = sorted(salaries)\nmedian_salary = (sorted_s[n//2-1] + sorted_s[n//2]) / 2\nprint(f"中位数: {median_salary:,.0f} 元")\n\nfrom collections import Counter\nmode_salary = Counter(salaries).most_common(1)[0][0]\nprint(f"众数: {mode_salary:,} 元")\n</code></pre>\n<h3>离散程度度量</h3>\n<pre><code class="language-python">range_salary = max(salaries) - min(salaries)\nprint(f"极差: {range_salary:,} 元")\n\nvar_salary = sum((x - mean_salary) ** 2 for x in salaries) / (n - 1)\nstd_salary = var_salary ** 0.5\nprint(f"样本方差: {var_salary:,.0f}")\nprint(f"样本标准差: {std_salary:,.0f} 元")\n\ncv = std_salary / mean_salary * 100\nprint(f"变异系数: {cv:.1f}%")\n\nprint(f"\\nNumPy验证: 标准差={np.std(salaries, ddof=1):,.0f}")\n</code></pre>\n<h3>分布形态与异常值检测</h3>\n<pre><code class="language-python">q1 = np.percentile(salaries, 25)\nq3 = np.percentile(salaries, 75)\niqr = q3 - q1\nprint(f"Q1: {q1:,.0f}, Q3: {q3:,.0f}, IQR: {iqr:,.0f}")\n\nlower = q1 - 1.5 * iqr\nupper = q3 + 1.5 * iqr\noutliers = [x for x in salaries if x < lower or x > upper]\nprint(f"异常值边界: [{lower:,.0f}, {upper:,.0f}]")\nprint(f"异常值数量: {len(outliers)}")\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>中位数通常比均值更能反映数据的典型水平，因为不受极端值影响。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>样本方差分母使用 n-1（Bessel校正），NumPy中用 <code>ddof=1</code>。</div>'
      },
      {
        id: 'statistics-fundamentals-02',
        title: '概率分布',
        type: 'theory',
        duration: 25,
        content: '<p>概率分布描述了随机变量取各个值的概率。理解概率分布有助于预测和决策。</p>\n<h3>正态分布</h3>\n<pre><code class="language-python">import numpy as np\n\nnp.random.seed(42)\ndaily_sales = np.random.normal(100, 15, 1000).round().astype(int)\n\nprint(f"均值: {np.mean(daily_sales):.1f}, 标准差: {np.std(daily_sales):.1f}")\n\nmean = np.mean(daily_sales)\nstd = np.std(daily_sales)\nw1 = np.sum((daily_sales >= mean-std) & (daily_sales <= mean+std)) / len(daily_sales) * 100\nw2 = np.sum((daily_sales >= mean-2*std) & (daily_sales <= mean+2*std)) / len(daily_sales) * 100\nw3 = np.sum((daily_sales >= mean-3*std) & (daily_sales <= mean+3*std)) / len(daily_sales) * 100\n\nprint(f"\\n经验法则验证:")\nprint(f"±1σ: {w1:.1f}% (理论68.3%)")\nprint(f"±2σ: {w2:.1f}% (理论95.4%)")\nprint(f"±3σ: {w3:.1f}% (理论99.7%)")\n</code></pre>\n<h3>二项分布</h3>\n<pre><code class="language-python">np.random.seed(42)\nresults = np.random.binomial(100, 0.05, 10000)\n\nprint(f"广告转化模拟（100次展示，转化率5%）:")\nprint(f"平均转化: {np.mean(results):.1f}, 标准差: {np.std(results):.1f}")\nprint(f"至少8次转化概率: {np.sum(results >= 8) / len(results):.1%}")\nprint(f"零转化概率: {np.sum(results == 0) / len(results):.1%}")\n</code></pre>\n<h3>泊松分布</h3>\n<pre><code class="language-python">np.random.seed(42)\nhourly_calls = np.random.poisson(12, 1000)\n\nprint(f"客服来电（平均12通/小时）:")\nprint(f"平均: {np.mean(hourly_calls):.1f}, 标准差: {np.std(hourly_calls):.1f}")\nprint(f"95%分位: {np.percentile(hourly_calls, 95):.0f} 通")\nprint(f"建议客服人数: {int(np.ceil(np.percentile(hourly_calls, 95) / 5))} 人")\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>正态分布适用于连续型数据，二项分布适用于"成功/失败"场景，泊松分布适用于稀有事件计数。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>分析前建议先检查数据分布形态，严重偏态时考虑对数变换。</div>'
      },
      {
        id: 'statistics-fundamentals-03',
        title: '假设检验入门',
        type: 'practice',
        duration: 30,
        initialCode: 'import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nn_A, n_B = 1000, 1000\nconversions_A, conversions_B = 52, 68\n\n# TODO 1: 计算两组的转化率\nrate_A = None\nrate_B = None\nprint(f"A组转化率: {rate_A:.2%}")\nprint(f"B组转化率: {rate_B:.2%}")\nprint(f"相对提升: {(rate_B - rate_A) / rate_A:.1%}")\n\n# TODO 2: 双比例Z检验\nz_stat = None\np_value = None\nprint(f"\\nZ统计量: {z_stat:.4f}")\nprint(f"P值: {p_value:.4f}")\n\n# TODO 3: 判断是否显著\nalpha = 0.05\nis_significant = None\nprint(f"是否显著: {\'是\' if is_significant else \'否\'}")\n\n# TODO 4: 95%置信区间\npooled_rate = (conversions_A + conversions_B) / (n_A + n_B)\nse = np.sqrt(pooled_rate * (1 - pooled_rate) * (1/n_A + 1/n_B))\nci_lower = None\nci_upper = None\nprint(f"95%置信区间: [{ci_lower:.4f}, {ci_upper:.4f}]")\n\n# TODO 5: 配对样本t检验\nbefore = [72, 68, 75, 80, 65, 78, 70, 82, 74, 69]\nafter = [80, 75, 82, 85, 72, 83, 78, 88, 79, 76]\nt_stat = None\np_value_paired = None\nprint(f"\\n培训前: {np.mean(before):.1f}, 培训后: {np.mean(after):.1f}")\nprint(f"t统计量: {t_stat:.4f}, P值: {p_value_paired:.6f}")\nprint(f"培训效果显著: {\'是\' if p_value_paired < 0.05 else \'否\'}")\n',
        expectedOutput: 'A组转化率',
        hints: ['转化率 = 转化次数 / 访问次数', '使用 stats.proportions_ztest()', 'P值 < 0.05 时显著', '使用 stats.norm.interval()', '使用 stats.ttest_rel()'],
        testCases: [{ input: '', expected: 'A组转化率' }]
      },
      {
        id: 'statistics-fundamentals-04',
        title: '相关性与回归分析',
        type: 'practice',
        duration: 30,
        initialCode: 'import numpy as np\nfrom scipy import stats\n\nnp.random.seed(42)\nad_spend = np.array([2, 4, 6, 8, 10, 12, 14, 16, 18, 20,\n                     3, 5, 7, 9, 11, 13, 15, 17, 19, 25])\nsales = np.round(3 * ad_spend + 10 + np.random.normal(0, 8, len(ad_spend)), 1)\n\n# TODO 1: 皮尔逊相关系数\nr, p_value = None, None\nprint(f"相关系数 r = {r:.4f}")\nprint(f"强度: {\'强\' if abs(r) > 0.7 else \'中等\' if abs(r) > 0.4 else \'弱\'}")\n\n# TODO 2: 决定系数 R²\nr_squared = None\nprint(f"R² = {r_squared:.4f}")\n\n# TODO 3: 线性回归\nslope, intercept, r_value, p_value_reg, std_err = None, None, None, None, None\nprint(f"\\n回归方程: 销售额 = {intercept:.2f} + {slope:.2f} × 广告投入")\n\n# TODO 4: 预测\nfor ad in [5, 10, 15, 20, 30]:\n    predicted = None\n    print(f"广告{ad:2d}万 -> 预测销售额: {predicted:.1f}万")\n\n# TODO 5: 残差分析\npredictions = slope * ad_spend + intercept\nresiduals = sales - predictions\nprint(f"\\n残差均值: {np.mean(residuals):.4f}")\n\n# TODO 6: 斯皮尔曼秩相关\nrho, p_spearman = None, None\nprint(f"斯皮尔曼相关系数: {rho:.4f}")\n',
        expectedOutput: '相关系数',
        hints: ['使用 stats.pearsonr(x, y)', 'R² = r²', '使用 stats.linregress(x, y)', '预测值 = intercept + slope * x', '使用 stats.spearmanr(x, y)'],
        testCases: [{ input: '', expected: '相关系数' }]
      },
      {
        id: 'statistics-fundamentals-05',
        title: '统计分析测验',
        type: 'quiz',
        duration: 15,
        questions: [
          { question: '以下哪个指标最能反映数据的"典型值"，且不受极端值影响？', options: ['均值', '中位数', '众数', '标准差'], correct: 1, explanation: '中位数不受极端值影响。' },
          { question: '在假设检验中，P值的含义是什么？', options: ['原假设为真的概率', '在原假设为真条件下观察到当前或更极端结果的概率', '备择假设为真的概率', '样本均值等于总体均值的概率'], correct: 1, explanation: 'P值表示在H0为真时观察到当前结果的概率。' },
          { question: '相关系数 r = -0.85 表示什么？', options: ['强正相关', '强负相关', '没有关系', '一个变量导致另一个减少85%'], correct: 1, explanation: 'r = -0.85 表示强负相关。相关性不等于因果性。' },
          { question: '决定系数 R² = 0.81 的正确解读是？', options: ['预测准确率81%', '自变量可解释因变量81%的变异', '81%数据点在回归线上', '回归系数为0.81'], correct: 1, explanation: 'R²表示自变量对因变量变异的解释比例。' },
          { question: '哪种分布最适合描述"每小时到达客服中心的电话数量"？', options: ['正态分布', '二项分布', '泊松分布', '均匀分布'], correct: 2, explanation: '泊松分布用于描述单位时间内随机事件发生的次数。' }
        ]
      }
    ]
  },
  // ============================================================
  // 课程5：Excel数据处理
  // ============================================================
  {
    id: 'excel-analysis',
    title: 'Excel数据处理',
    icon: '📋',
    difficulty: 'beginner',
    description: '使用Python操作Excel文件，实现办公自动化',
    category: '办公自动化',
    lessons: [
      {
        id: 'excel-analysis-01',
        title: 'openpyxl基础',
        type: 'theory',
        duration: 20,
        content: '<p>openpyxl是Python中操作Excel文件（.xlsx格式）的核心库。</p>\n<h3>安装与导入</h3>\n<pre><code class="language-python">from openpyxl import Workbook, load_workbook\nfrom openpyxl.styles import Font, Alignment, Border, Side, PatternFill\nfrom openpyxl.utils import get_column_letter\nprint("openpyxl已准备就绪！")\n</code></pre>\n<h3>创建新工作簿</h3>\n<pre><code class="language-python">wb = Workbook()\nws = wb.active\nws.title = "销售数据"\n\nheaders = [\'日期\', \'产品\', \'单价\', \'销量\', \'销售额\']\ndata = [\n    [\'2024-01-15\', \'笔记本电脑\', 5990, 10, 59900],\n    [\'2024-01-16\', \'无线耳机\', 299, 30, 8970],\n    [\'2024-01-17\', \'机械键盘\', 599, 25, 14975],\n    [\'2024-01-18\', \'显示器\', 3280, 20, 65600],\n    [\'2024-01-19\', \'鼠标垫\', 99, 150, 14850],\n]\n\nfor col, header in enumerate(headers, start=1):\n    ws.cell(row=1, column=col, value=header)\nfor row_idx, row_data in enumerate(data, start=2):\n    for col_idx, value in enumerate(row_data, start=1):\n        ws.cell(row=row_idx, column=col_idx, value=value)\n\nwb.save(\'/tmp/sales_data.xlsx\')\nprint("Excel文件已保存！")\n</code></pre>\n<h3>单元格操作</h3>\n<pre><code class="language-python">wb = load_workbook(\'/tmp/sales_data.xlsx\')\nws = wb.active\n\nprint(f"A1: {ws[\'A1\'].value}")\nprint(f"B2: {ws[\'B2\'].value}")\nprint(f"第2行第3列: {ws.cell(row=2, column=3).value}")\n\nprint("\\n所有数据:")\nfor row in ws.iter_rows(min_row=1, max_row=ws.max_row,\n                         min_col=1, max_col=ws.max_column, values_only=True):\n    print(row)\n\nprint(f"\\n数据范围: {ws.dimensions}")\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>openpyxl使用1-based索引，与Python的0-based不同。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>openpyxl只支持 .xlsx 格式，不支持 .xls。</div>'
      },
      {
        id: 'excel-analysis-02',
        title: '读写Excel文件',
        type: 'theory',
        duration: 25,
        content: '<p>在实际工作中，经常需要从Excel读取数据进行分析，或将结果写回Excel。</p>\n<h3>高效读取Excel数据</h3>\n<pre><code class="language-python">from openpyxl import load_workbook\n\nwb = load_workbook(\'/tmp/sales_data.xlsx\')\nprint(f"工作表: {wb.sheetnames}")\nws = wb[\'销售数据\']\n\n# 逐行读取\nfor row in ws.iter_rows(values_only=True):\n    print(row)\n\n# 读取为字典列表\nheaders = [cell.value for cell in ws[1]]\ndata_list = [dict(zip(headers, row))\n             for row in ws.iter_rows(min_row=2, values_only=True)]\nfor item in data_list:\n    print(item)\n</code></pre>\n<h3>批量写入与格式化</h3>\n<pre><code class="language-python">from openpyxl import Workbook\nfrom openpyxl.styles import Font, PatternFill, Alignment\nfrom openpyxl.utils import get_column_letter\n\nwb = Workbook()\nws = wb.active\nws.title = "月度报告"\n\nheaders = [\'月份\', \'销售额\', \'成本\', \'利润\', \'利润率\']\nfor col, header in enumerate(headers, start=1):\n    cell = ws.cell(row=1, column=col, value=header)\n    cell.font = Font(bold=True, color=\'FFFFFF\')\n    cell.fill = PatternFill(start_color=\'4472C4\', end_color=\'4472C4\', fill_type=\'solid\')\n    cell.alignment = Alignment(horizontal=\'center\')\n\nmonthly = [[\'1月\', 125900, 88130, 37770, 0.30],\n           [\'2月\', 133600, 93520, 40080, 0.30],\n           [\'3月\', 138000, 96600, 41400, 0.30]]\n\nfor row_idx, row_data in enumerate(monthly, start=2):\n    for col_idx, value in enumerate(row_data, start=1):\n        cell = ws.cell(row=row_idx, column=col_idx, value=value)\n        if col_idx == 5:\n            cell.number_format = \'0.0%\'\n        elif col_idx in [2, 3, 4]:\n            cell.number_format = \'#,##0\'\n\nfor col in range(1, 6):\n    ws.column_dimensions[get_column_letter(col)].width = 15\n\nwb.save(\'/tmp/monthly_report.xlsx\')\nprint("月度报告已保存！")\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>大文件使用 <code>read_only=True</code> 加载节省内存。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>openpyxl读取公式只获取文本，不计算结果。用 <code>data_only=True</code> 读取计算值。</div>'
      },
      {
        id: 'excel-analysis-03',
        title: '数据格式化',
        type: 'practice',
        duration: 30,
        initialCode: 'from openpyxl import Workbook\nfrom openpyxl.styles import Font, PatternFill, Alignment, Border, Side\nfrom openpyxl.utils import get_column_letter\n\nwb = Workbook()\nws = wb.active\nws.title = "销售业绩"\n\nsales_data = [\n    [\'员工\', \'部门\', \'1月\', \'2月\', \'3月\', \'季度总额\', \'排名\'],\n    [\'张三\', \'华东区\', 52000, 58000, 61000, None, None],\n    [\'李四\', \'华南区\', 45000, 48000, 52000, None, None],\n    [\'王五\', \'华北区\', 38000, 42000, 45000, None, None],\n    [\'赵六\', \'华东区\', 55000, 62000, 58000, None, None],\n    [\'钱七\', \'华南区\', 41000, 39000, 46000, None, None],\n    [\'孙八\', \'华北区\', 35000, 38000, 40000, None, None],\n]\n\n# TODO 1: 写入数据\n# TODO 2: 计算季度总额和排名\n# TODO 3: 设置表头样式（深蓝色背景白色粗体）\n# TODO 4: 设置数据样式（千分位格式、斑马纹）\n# TODO 5: 添加边框\n# TODO 6: 高亮最高行（金色背景）\n# TODO 7: 自动调整列宽并冻结首行\n\nws.freeze_panes = \'A2\'\nwb.save(\'/tmp/sales_performance.xlsx\')\n\nprint("销售业绩报表已生成！")\nfor row in ws.iter_rows(values_only=True):\n    formatted = []\n    for cell in row:\n        if isinstance(cell, (int, float)) and cell is not None:\n            formatted.append(f"{cell:,}")\n        else:\n            formatted.append(str(cell) if cell is not None else \'\')\n    print(" | ".join(formatted))\n',
        expectedOutput: '销售业绩报表已生成！',
        hints: ['使用 ws.cell(row, col, value) 写入', '季度总额 = 1月+2月+3月', '使用 PatternFill 设置背景色', '使用 cell.number_format 设置格式', '使用 cell.border 设置边框'],
        testCases: [{ input: '', expected: '销售业绩报表已生成' }]
      },
      {
        id: 'excel-analysis-04',
        title: '公式与图表生成',
        type: 'practice',
        duration: 30,
        initialCode: 'from openpyxl import Workbook\nfrom openpyxl.styles import Font, PatternFill, Alignment\nfrom openpyxl.chart import BarChart, PieChart, LineChart, Reference\nfrom openpyxl.utils import get_column_letter\n\nwb = Workbook()\nws = wb.active\nws.title = "原始数据"\n\nheaders = [\'产品类别\', \'Q1销售额\', \'Q2销售额\', \'Q3销售额\', \'Q4销售额\']\nproducts = [\n    [\'电子产品\', 320000, 380000, 420000, 510000],\n    [\'办公用品\', 180000, 195000, 210000, 240000],\n    [\'家居用品\', 150000, 165000, 178000, 200000],\n    [\'食品饮料\', 280000, 310000, 295000, 350000],\n    [\'服装鞋帽\', 220000, 190000, 250000, 380000],\n]\n\n# TODO 1: 写入表头和数据\n# TODO 2: 添加"年度总额"列（SUM公式）\n# TODO 3: 添加"Q4占比"列（公式）\n# TODO 4: 添加汇总行（SUM和AVERAGE）\n# TODO 5: 创建柱状图、饼图、折线图\n# TODO 6: 将图表添加到工作表\n\nwb.save(\'/tmp/financial_report.xlsx\')\nprint("财务分析报告已生成！")\nprint(f"工作表: {wb.sheetnames}")\n',
        expectedOutput: '财务分析报告已生成！',
        hints: ['使用 cell.value = "=SUM(B2:E2)"', '使用 cell.value = "=E2/F2" 计算占比', '使用 Reference 指定图表数据', 'BarChart 需要 categories 和 data'],
        testCases: [{ input: '', expected: '财务分析报告已生成' }]
      },
      {
        id: 'excel-analysis-05',
        title: 'Excel数据处理测验',
        type: 'quiz',
        duration: 15,
        questions: [
          { question: 'openpyxl中如何访问名为"销售数据"的工作表？', options: ['wb.get_sheet("销售数据")', 'wb["销售数据"]', 'wb.sheet("销售数据")', 'wb.open("销售数据")'], correct: 1, explanation: '使用 wb["工作表名"] 访问。' },
          { question: '哪个方法可以高效遍历所有行？', options: ['for row in ws.rows:', 'for row in ws.iter_rows(values_only=True):', 'for row in ws.get_all_rows():', 'for row in ws.read_rows():'], correct: 1, explanation: 'ws.iter_rows(values_only=True) 是推荐方法。' },
          { question: '如何设置千分位整数格式？', options: ['cell.format = "#,##0"', 'cell.number_format = "#,##0"', 'cell.style = "number"', 'cell.set_format("#,##0")'], correct: 1, explanation: '使用 cell.number_format 属性。' },
          { question: '如何冻结首行？', options: ['ws.freeze_row(1)', 'ws.freeze_panes = "A2"', 'ws.set_freeze("row1")', 'ws.freeze_header = True'], correct: 1, explanation: '使用 ws.freeze_panes = "A2"。' },
          { question: 'openpyxl支持哪种格式？', options: ['仅.xls', '仅.xlsx', '.xls和.xlsx', '.xls、.xlsx和.csv'], correct: 1, explanation: 'openpyxl仅支持 .xlsx 格式。' }
        ]
      }
    ]
  },
  // ============================================================
  // 课程6：商务数据实战项目
  // ============================================================
  {
    id: 'business-project',
    title: '商务数据实战项目',
    icon: '💼',
    difficulty: 'advanced',
    description: '综合运用所学知识，完成真实商务数据分析项目',
    category: '实战项目',
    lessons: [
      {
        id: 'business-project-01',
        title: '销售数据分析',
        type: 'theory',
        duration: 30,
        content: '<p>销售数据分析是商务数据分析中最核心的应用场景。本课时综合运用Pandas、NumPy和Matplotlib完成完整的分析报告。</p>\n<h3>数据准备</h3>\n<pre><code class="language-python">import pandas as pd\nimport numpy as np\nimport io\n\ncsv_data = """日期,门店,区域,产品类别,产品名称,单价,销量,客户类型\n2024-01-05,旗舰店,华东区,电子产品,笔记本电脑,5990,15,VIP\n2024-01-08,标准店,华南区,电子产品,无线耳机,299,45,普通\n2024-01-12,旗舰店,华北区,办公用品,打印机,1299,8,VIP\n2024-01-15,标准店,华东区,家居用品,台灯,199,32,普通\n2024-01-20,旗舰店,华南区,电子产品,平板电脑,3299,12,VIP\n2024-02-03,标准店,华北区,食品饮料,咖啡豆,89,68,普通\n2024-02-10,旗舰店,华东区,服装鞋帽,运动鞋,899,22,VIP\n2024-02-18,标准店,华南区,电子产品,智能手表,1599,18,普通\n2024-02-25,旗舰店,华北区,家居用品,空气净化器,2899,6,VIP\n2024-03-05,标准店,华东区,办公用品,笔记本,15,120,普通"""\n\ndf = pd.read_csv(io.StringIO(csv_data))\ndf[\'日期\'] = pd.to_datetime(df[\'日期\'])\ndf[\'月份\'] = df[\'日期\'].dt.month\ndf[\'销售额\'] = df[\'单价\'] * df[\'销量\']\nprint(f"数据形状: {df.shape}")\nprint(df.head())\n</code></pre>\n<h3>多维度分析</h3>\n<pre><code class="language-python"># 月度趋势\nmonthly = df.groupby(\'月份\').agg({\'销售额\': \'sum\', \'销量\': \'sum\'}).reset_index()\nprint("月度销售趋势:")\nprint(monthly)\n\n# 区域对比\nregional = df.groupby(\'区域\').agg({\'销售额\': [\'sum\', \'mean\'], \'销量\': \'sum\'}).round(0)\nprint("\\n区域销售对比:")\nprint(regional)\n\n# 产品类别\ncategory = df.groupby(\'产品类别\').agg({\'销售额\': \'sum\', \'销量\': \'sum\'}).sort_values(\'销售额\', ascending=False)\ncategory[\'占比\'] = category[\'销售额\'] / category[\'销售额\'].sum()\nprint("\\n产品类别分析:")\nprint(category)\n\n# 客户类型\ncustomer = df.groupby(\'客户类型\').agg({\'销售额\': [\'sum\', \'mean\'], \'销量\': \'sum\'}).round(0)\nprint("\\n客户类型分析:")\nprint(customer)\n</code></pre>\n<h3>关键KPI</h3>\n<pre><code class="language-python">total_revenue = df[\'销售额\'].sum()\ntotal_qty = df[\'销量\'].sum()\navg_order = df[\'销售额\'].mean()\nbest = df.groupby(\'产品名称\')[\'销售额\'].sum().idxmax()\nbest_region = df.groupby(\'区域\')[\'销售额\'].sum().idxmax()\nvip_ratio = df[df[\'客户类型\']==\'VIP\'][\'销售额\'].sum() / total_revenue * 100\n\nprint("=" * 50)\nprint("关键业务指标")\nprint("=" * 50)\nprint(f"总销售额: {total_revenue:,.0f} 元")\nprint(f"总销量: {total_qty:,} 件")\nprint(f"平均订单: {avg_order:,.0f} 元")\nprint(f"最畅销: {best}")\nprint(f"最佳区域: {best_region}")\nprint(f"VIP贡献: {vip_ratio:.1f}%")\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>商务数据分析遵循"总-分-总"思路：先看整体指标，再按维度拆解，最后汇总发现。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>数据清洗通常占分析时间的60%-80%，确保数据质量是分析的前提。</div>'
      },
      {
        id: 'business-project-02',
        title: '客户分群分析',
        type: 'theory',
        duration: 30,
        content: '<p>客户分群（Customer Segmentation）是根据客户行为特征将客户划分为不同群体的分析方法。</p>\n<h3>RFM分析模型</h3>\n<ul>\n  <li><strong>Recency</strong>：最近消费时间</li>\n  <li><strong>Frequency</strong>：消费频率</li>\n  <li><strong>Monetary</strong>：消费金额</li>\n</ul>\n<pre><code class="language-python">import pandas as pd\nimport numpy as np\nfrom datetime import datetime, timedelta\n\nnp.random.seed(42)\ncustomers = []\nfor i in range(100):\n    days_ago = min(int(np.random.exponential(30)), 180)\n    last_purchase = datetime(2024, 12, 31) - timedelta(days=days_ago)\n    frequency = min(max(1, int(np.random.normal(8, 4))), 20)\n    monetary = round(frequency * np.random.uniform(200, 2000), 2)\n    customers.append({\'客户ID\': f"C{i+1:03d}", \'最近购买\': last_purchase,\n                      \'购买次数\': frequency, \'消费金额\': monetary})\n\ndf = pd.DataFrame(customers)\ndf[\'距今天数\'] = (datetime(2024, 12, 31) - df[\'最近购买\']).dt.days\nprint(df.head(10))\n</code></pre>\n<h3>RFM评分与分群</h3>\n<pre><code class="language-python">df[\'R评分\'] = pd.qcut(df[\'距今天数\'], 5, labels=[5,4,3,2,1], duplicates=\'drop\').astype(int)\ndf[\'F评分\'] = pd.qcut(df[\'购买次数\'], 5, labels=[1,2,3,4,5], duplicates=\'drop\').astype(int)\ndf[\'M评分\'] = pd.qcut(df[\'消费金额\'], 5, labels=[1,2,3,4,5], duplicates=\'drop\').astype(int)\ndf[\'RFM总分\'] = df[\'R评分\'] + df[\'F评分\'] + df[\'M评分\']\n\ndef segment(rfm):\n    r, f, m = rfm[\'R评分\'], rfm[\'F评分\'], rfm[\'M评分\']\n    if r >= 4 and f >= 4 and m >= 4: return \'重要价值客户\'\n    elif r >= 4 and f >= 3: return \'重要发展客户\'\n    elif r >= 3 and f >= 4 and m >= 3: return \'重要保持客户\'\n    elif r >= 4 and f <= 2: return \'新客户\'\n    elif r <= 2 and f >= 4 and m >= 4: return \'重要挽留客户\'\n    elif r <= 2 and f <= 2: return \'流失客户\'\n    else: return \'一般客户\'\n\ndf[\'客户分群\'] = df.apply(segment, axis=1)\ncounts = df[\'客户分群\'].value_counts()\nprint("客户分群占比:")\nfor seg, cnt in counts.items():\n    print(f"  {seg}: {cnt}人 ({cnt/len(df)*100:.1f}%)")\n</code></pre>\n<h3>营销策略</h3>\n<pre><code class="language-python">strategies = {\n    \'重要价值客户\': \'VIP专属服务，定期赠送礼品\',\n    \'重要发展客户\': \'推荐高价值产品，提供升级优惠\',\n    \'重要保持客户\': \'发送关怀信息，提供专属折扣\',\n    \'新客户\': \'推荐入门产品，提供首单优惠\',\n    \'重要挽留客户\': \'发送召回优惠，了解流失原因\',\n    \'流失客户\': \'低成本渠道触达，发送限时大促\',\n    \'一般客户\': \'定期推送促销信息，培养消费习惯\'\n}\nfor seg, strategy in strategies.items():\n    print(f"【{seg}】: {strategy}")\n</code></pre>\n<div class="tip"><strong>💡 提示：</strong>RFM核心：R高、F高、M高的客户是最有价值的。针对不同分群制定差异化策略。</div>\n<div class="warning"><strong>⚠️ 注意：</strong>使用 <code>pd.qcut()</code> 分箱时，大量相同值可用 <code>duplicates=\'drop\'</code>。</div>'
      },
      {
        id: 'business-project-03',
        title: '库存预测',
        type: 'practice',
        duration: 35,
        initialCode: 'import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\nproducts = [\'笔记本电脑\', \'无线耳机\', \'机械键盘\', \'显示器\', \'鼠标垫\',\n            \'移动硬盘\', \'蓝牙音箱\', \'平板电脑\']\nmonths = pd.date_range(\'2024-01-01\', periods=12, freq=\'MS\')\nbase_sales = {\'笔记本电脑\': 100, \'无线耳机\': 300, \'机械键盘\': 250,\n              \'显示器\': 80, \'鼠标垫\': 500, \'移动硬盘\': 180,\n              \'蓝牙音箱\': 220, \'平板电脑\': 120}\n\ndata = []\nfor product in products:\n    base = base_sales[product]\n    for i, month in enumerate(months):\n        trend = 1 + 0.015 * i\n        seasonal = 1 + 0.1 * np.sin(2 * np.pi * i / 12)\n        noise = np.random.normal(1, 0.08)\n        sales = max(int(base * trend * seasonal * noise), 10)\n        data.append({\'月份\': month.strftime(\'%Y-%m\'), \'产品\': product, \'销量\': sales})\n\ndf = pd.DataFrame(data)\n\n# TODO 1: 计算月均销量和标准差\n# TODO 2: 分析销量趋势（前3月 vs 后3月）\n# TODO 3: 移动平均法预测下月销量\n# TODO 4: 计算安全库存（95%服务水平，系数1.65）\n# TODO 5: 计算建议补货量\n\nprint("=" * 60)\nprint("库存补货建议报告")\nprint("=" * 60)\n',
        expectedOutput: '库存补货建议报告',
        hints: ['使用 groupby().agg([\'mean\', \'std\'])', '比较前3月和后3月均值', '使用 tail(3)[\'销量\'].mean()', '安全库存 = 1.65 × 标准差', '补货量 = 预测 + 安全库存 - 当前库存'],
        testCases: [{ input: '', expected: '库存补货建议报告' }]
      },
      {
        id: 'business-project-04',
        title: '综合项目实战',
        type: 'practice',
        duration: 40,
        initialCode: 'import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\nn_records = 500\nproducts = [\'笔记本电脑\', \'无线耳机\', \'机械键盘\', \'显示器\', \'鼠标垫\',\n            \'移动硬盘\', \'蓝牙音箱\', \'平板电脑\']\nregions = [\'华东区\', \'华南区\', \'华北区\', \'西南区\']\nchannels = [\'线上\', \'线下\']\n\nbase_prices = {\'笔记本电脑\': 5990, \'无线耳机\': 299, \'机械键盘\': 599,\n               \'显示器\': 3280, \'鼠标垫\': 99, \'移动硬盘\': 459,\n               \'蓝牙音箱\': 499, \'平板电脑\': 3299}\n\ndata = []\nfor _ in range(n_records):\n    month = np.random.randint(1, 13)\n    product = np.random.choice(products)\n    region = np.random.choice(regions)\n    channel = np.random.choice(channels, p=[0.6, 0.4])\n    ctype = np.random.choice([\'VIP\', \'普通\'], p=[0.3, 0.7])\n    price = base_prices[product] * (1 if ctype == \'普通\' else 0.95)\n    quantity = max(1, int(np.random.exponential(5)))\n    if ctype == \'VIP\': quantity = int(quantity * 1.5)\n    data.append({\'月份\': month, \'产品\': product, \'区域\': region,\n                 \'渠道\': channel, \'客户类型\': ctype,\n                 \'单价\': round(price), \'销量\': quantity})\n\ndf = pd.DataFrame(data)\ndf[\'销售额\'] = df[\'单价\'] * df[\'销量\']\ndf[\'季度\'] = df[\'月份\'].apply(lambda m: f"Q{(m-1)//3 + 1}")\n\n# TODO 1: 整体KPI（总销售额、总订单数、平均订单金额）\n# TODO 2: 月度趋势分析\n# TODO 3: 产品Top5分析\n# TODO 4: 区域分析\n# TODO 5: 渠道对比\n# TODO 6: 客户类型分析\n# TODO 7: 季度环比增长\n\nprint("=" * 60)\nprint("电商年度数据分析报告")\nprint("=" * 60)\n',
        expectedOutput: '电商年度数据分析报告',
        hints: ['使用 df[\'销售额\'].sum() 计算总额', '使用 groupby(\'月份\') 月度分析', '使用 sort_values().head(5) 获取Top5', '使用 pct_change() 计算环比增长', '使用 crosstab() 交叉分析'],
        testCases: [{ input: '', expected: '电商年度数据分析报告' }]
      }
    ]
  }

];
