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
        initialCode: `import pandas as pd
import numpy as np
from itertools import combinations

# 生成模拟交易数据
np.random.seed(42)
products = ['牛奶', '面包', '鸡蛋', '啤酒', '尿布', '可乐', '薯片', '黄油', '苹果', '咖啡']
n_transactions = 200
transactions = []
for _ in range(n_transactions):
    basket = set(np.random.choice(products, size=np.random.randint(2, 6), replace=False))
    if '尿布' in basket and np.random.random() < 0.7:
        basket.add('啤酒')
    if '面包' in basket and np.random.random() < 0.6:
        basket.add('黄油')
    if '咖啡' in basket and np.random.random() < 0.5:
        basket.add('薯片')
    transactions.append(basket)

min_support = 0.1  # 最小支持度10%
min_confidence = 0.5  # 最小置信度50%

# TODO 1: 实现计算支持度的函数
# def calc_support(itemset, transactions):
#     pass

# TODO 2: 实现Apriori算法，找出所有频繁项集
# def apriori(transactions, min_support, max_length=3):
#     pass

# TODO 3: 从频繁项集生成关联规则
# def generate_rules(frequent_itemsets, transactions, min_confidence):
#     pass

print("Apriori算法实现完成！")`,
        expectedOutput: 'Apriori算法实现完成！',
        hints: ['calc_support: 遍历transactions，检查itemset是否为事务的子集，计数/总数', 'apriori: 先找频繁1-项集，然后用combinations生成候选k-项集，用先验性质剪枝', 'generate_rules: 对每个频繁项集，枚举所有非空真子集作为前件，计算置信度和提升度'],
        testCases: [{ input: '', expected: 'Apriori算法实现完成！' }]
      },
      {
        id: 'market-basket-05',
        title: '使用mlxtend库进行购物篮分析',
        type: 'practice',
        duration: 30,
        initialCode: '# 使用mlxtend库（专业关联规则挖掘库）\n# mlxtend提供了高效的Apriori和FP-Growth实现\n\nimport pandas as pd\nimport numpy as np\nfrom mlxtend.preprocessing import TransactionEncoder\nfrom mlxtend.frequent_patterns import apriori, fpgrowth, association_rules\n\n# 准备交易数据\nnp.random.seed(42)\nproducts = [\'牛奶\', \'面包\', \'鸡蛋\', \'啤酒\', \'尿布\', \'可乐\', \'薯片\', \'黄油\', \'苹果\', \'咖啡\']\nn_transactions = 300\ntransactions = []\nfor _ in range(n_transactions):\n    basket = set(np.random.choice(products, size=np.random.randint(2, 6), replace=False))\n    if \'尿布\' in basket and np.random.random() < 0.7:\n        basket.add(\'啤酒\')\n    if \'面包\' in basket and np.random.random() < 0.6:\n        basket.add(\'黄油\')\n    if \'咖啡\' in basket and np.random.random() < 0.5:\n        basket.add(\'薯片\')\n    transactions.append(list(basket))\n\n# TODO 1: 使用TransactionEncoder将事务数据转换为布尔矩阵\n# te = TransactionEncoder()\n# te_ary = te.fit(transactions).transform(transactions)\n# df = pd.DataFrame(te_ary, columns=te.columns_)\n# print(f"数据维度: {df.shape}")\n# print(f"商品种类: {df.shape[1]}")\n# print(f"事务数量: {df.shape[0]}")\n\n\n# TODO 2: 使用apriori找出频繁项集（最小支持度5%）\n# frequent_items = apriori(df, min_support=0.05, use_colnames=True)\n# frequent_items[\'length\'] = frequent_items[\'itemsets\'].apply(lambda x: len(x))\n# print("\\n=== 频繁项集（支持度>=5%）===")\n# print(frequent_items.sort_values(\'support\', ascending=False).head(15).to_string())\n\n\n# TODO 3: 生成关联规则（最小置信度50%）\n# rules = association_rules(frequent_items, metric="confidence", min_threshold=0.5)\n# print("\\n=== 关联规则（置信度>=50%）===")\n# print(f"共发现 {len(rules)} 条规则")\n# print(rules[[\'antecedents\', \'consequents\', \'support\', \'confidence\', \'lift\']].sort_values(\'lift\', ascending=False).head(10).to_string())\n\n\n# TODO 4: 筛选高价值规则（提升度>1.5且支持度>10%）\n# strong_rules = rules[(rules[\'lift\'] > 1.5) & (rules[\'support\'] > 0.1)]\n# print("\\n=== 高价值关联规则 ===")\n# for _, row in strong_rules.iterrows():\n#     print(f"  {set(row[\'antecedents\'])} → {set(row[\'consequents\'])}")\n#     print(f"    支持度={row[\'support\']:.2%}, 置信度={row[\'confidence\']:.2%}, 提升度={row[\'lift\']:.2f}")\n\nprint("mlxtend购物篮分析完成！")',
        expectedOutput: 'mlxtend购物篮分析完成！',
        hints: ['TransactionEncoder将列表形式的事务数据转换为one-hot编码的DataFrame', 'apriori()返回频繁项集DataFrame，包含support列', 'association_rules()自动计算support、confidence、lift等指标', '筛选条件: lift > 1.5 表示强关联, support > 0.1 表示有统计意义'],
        testCases: [{ input: '', expected: 'mlxtend购物篮分析完成！' }]
      },
      {
        id: 'market-basket-06',
        title: '购物篮分析综合测验',
        type: 'quiz',
        duration: 15,
        questions: [
          {
            question: '购物篮分析中，支持度（Support）的定义是什么？',
            options: ['购买A时同时购买B的概率', '项集在所有事务中出现的频率', 'A和B之间的相关系数', '购买A后购买B的条件概率'],
            correct: 1,
            explanation: '支持度是项集在所有事务中出现的频率，即包含该项集的事务数除以总事务数。'
          },
          {
            question: '提升度（Lift）大于1表示什么？',
            options: ['A和B负相关', 'A和B相互独立', 'A和B正相关，一起出现的频率高于随机期望', 'A导致B发生'],
            correct: 2,
            explanation: 'Lift > 1 表示A和B正相关，一起出现的频率高于随机情况下的期望值。Lift = 1表示独立，Lift < 1表示负相关。'
          },
          {
            question: 'Apriori算法的先验性质（Apriori Property）是指？',
            options: ['频繁项集的超集一定频繁', '频繁项集的所有子集也必须是频繁的', '非频繁项集的子集一定频繁', '支持度高的项集置信度也一定高'],
            correct: 1,
            explanation: 'Apriori的核心性质：如果一个项集是频繁的，那么它的所有子集也必须是频繁的。这个性质用于剪枝，减少候选集数量。'
          },
          {
            question: '在"啤酒与尿布"案例中，如果Support({尿布})=30%，Support({啤酒})=40%，Support({尿布,啤酒})=21%，那么Lift(尿布→啤酒)是多少？',
            options: ['0.525', '0.7', '1.75', '1.43'],
            correct: 2,
            explanation: 'Lift = Support(A,B) / (Support(A) × Support(B)) = 0.21 / (0.30 × 0.40) = 0.21 / 0.12 = 1.75。Lift > 1说明尿布和啤酒之间存在正相关。'
          },
          {
            question: '以下哪种方法最适合处理大规模购物篮数据（百万级事务）？',
            options: ['暴力枚举所有商品组合', 'Apriori算法', 'FP-Growth算法', '简单的频率统计'],
            correct: 2,
            explanation: 'FP-Growth算法不需要生成候选集，而是构建FP树，只需要扫描数据库两次，适合大规模数据集。Apriori在数据量大时候选集爆炸，效率较低。'
          }
        ]
      }
    ]
  }

];
