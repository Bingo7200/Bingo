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
        title: 'Python环境与第一个程序',
        type: 'theory',
        duration: 15,
        content: `
<p>Python是一种广泛使用的高级编程语言，由Guido van Rossum于1991年发布。因其简洁优雅的语法和强大的生态系统，Python已成为数据分析、人工智能和科学计算领域的首选语言。</p>
<h2>Python语言简介</h2>
<p>Python的设计哲学强调代码的可读性和简洁性。它的名字来源于英国喜剧团体"Monty Python"，而非蟒蛇。经过三十多年的发展，Python已经从一个简单的脚本语言成长为全球最受欢迎的编程语言之一。</p>
<h2>Python在数据分析领域的优势</h2>
<ul>
  <li><strong>语法简洁易学</strong>：Python代码接近自然语言，初学者也能快速上手</li>
  <li><strong>丰富的数据科学生态</strong>：Pandas、NumPy、Matplotlib、Scikit-learn等库覆盖了数据分析全流程</li>
  <li><strong>强大的社区支持</strong>：海量教程、文档和开源项目可供参考</li>
  <li><strong>良好的兼容性</strong>：支持多种数据格式（CSV、Excel、JSON、数据库等）</li>
  <li><strong>跨平台运行</strong>：Windows、macOS、Linux均可使用</li>
</ul>
<h2>第一个Python程序</h2>
<pre><code class="language-python"># 经典的Hello World程序
print("Hello, 数据分析!")

# 简单的计算示例
revenue = 150000
cost = 98000
profit = revenue - cost
print(f"利润: {profit} 元")
</code></pre>
<h2>注释的使用</h2>
<pre><code class="language-python"># 这是单行注释，用井号开头

"""
这是多行注释（文档字符串）
可以跨越多行
常用于函数和类的说明文档
"""

'''
也可以用三个单引号
创建多行注释
'''

# 注释的作用：
# 1. 解释代码的逻辑和意图
# 2. 临时禁用某行代码（调试时）
# 3. 为团队协作提供文档说明
</code></pre>
<h2>变量与基本操作</h2>
<pre><code class="language-python"># 变量赋值
company = "智联科技"
year = 2024
revenue = 5280000.50

# 查看变量类型
print(type(company))   # &lt;class 'str'&gt;
print(type(year))      # &lt;class 'int'&gt;
print(type(revenue))   # &lt;class 'float'&gt;

# print()输出
print("公司名称:", company)
print(f"成立年份: {year}")
print(f"年营收: {revenue:,.2f} 元")
</code></pre>
<div class="tip"><strong>提示：</strong>Python是解释型语言，不需要编译。代码从上到下逐行执行，这使得开发和调试非常方便。你可以随时在交互式环境中测试代码片段。</div>
<div class="warning"><strong>注意：</strong>Python对缩进敏感！Python使用缩进（通常4个空格）来表示代码块，而不是使用大括号。缩进不一致会导致IndentationError错误，这是初学者最常遇到的问题之一。</div>
        `
      },
      {
        id: 'python-basics-02',
        title: '变量与数据类型',
        type: 'theory',
        duration: 20,
        content: `
<p>变量是程序中存储数据的容器，数据类型决定了数据的性质和可执行的操作。掌握变量和数据类型是Python编程的基础。</p>
<h2>变量命名规则</h2>
<pre><code class="language-python"># 合法的变量名
company_name = "智联科技"
employee_count = 256
annual_revenue = 5280000.50
is_public = False
_private_var = 100      # 下划线开头表示私有变量

# 非法的变量名（会报错）
# 2name = "错误"         # 不能以数字开头
# my-name = "错误"       # 不能包含连字符
# class = "错误"         # 不能使用Python关键字

# 命名最佳实践（snake_case风格）
total_sales_amount = 128500
customer_age_average = 35
</code></pre>
<h2>基本数据类型</h2>
<pre><code class="language-python"># 1. 整数 (int) - 没有小数部分的数字
product_price = 299
quantity = 50
total = product_price * quantity
print(f"类型: {type(product_price)}, 总价: {total}")

# 2. 浮点数 (float) - 带小数部分的数字
exchange_rate = 6.89
usd_amount = 1000.00
cny_amount = usd_amount * exchange_rate
print(f"类型: {type(exchange_rate)}, 人民币: {cny_amount:.2f}")

# 3. 字符串 (str) - 文本数据
product_name = "商务数据分析课程"
description = '适合零基础学员'
print(f"类型: {type(product_name)}, 内容: {product_name}")

# 4. 布尔值 (bool) - 逻辑值
is_vip = True
has_discount = False
print(f"类型: {type(is_vip)}, 是否VIP: {is_vip}")
</code></pre>
<h2>类型转换</h2>
<pre><code class="language-python"># int() - 转换为整数
price_str = "199"
price_int = int(price_str)
print(f"字符串转整数: {price_int}, 类型: {type(price_int)}")

# float() - 转换为浮点数
price_float = float("199.99")
print(f"字符串转浮点: {price_float}")

# str() - 转换为字符串
num = 42
num_str = str(num)
print(f"数字转字符串: {num_str}, 类型: {type(num_str)}")

# 注意：转换失败会报错
# int("abc")  # ValueError: invalid literal for int()
</code></pre>
<h2>字符串操作</h2>
<pre><code class="language-python"># 字符串拼接
first_name = "张"
last_name = "三"
full_name = first_name + last_name
print(f"姓名: {full_name}")

# 字符串重复
separator = "-" * 30
print(separator)

# 字符串索引（从0开始）
text = "数据分析"
print(text[0])    # 数
print(text[-1])   # 析

# 字符串切片 [起始:结束:步长]
text = "Python数据分析"
print(text[0:6])     # Python
print(text[6:])      # 数据分析
print(text[::2])     # Pto数析
print(text[::-1])    # 析据数nohtyP
</code></pre>
<h2>f-string格式化</h2>
<pre><code class="language-python"># f-string（Python 3.6+推荐）
name = "张三"
sales = 128500
target = 150000
rate = sales / target * 100

print(f"销售员 {name} 本月销售额: {sales:,} 元")
print(f"完成率: {rate:.1f}%")
print(f"距目标还差: {target - sales:,} 元")

# 常用格式化选项
pi = 3.14159265
print(f"保留2位小数: {pi:.2f}")
print(f"千位分隔符: {1000000:,}")
print(f"百分比: {0.856:.1%}")
print(f"左对齐: {'hello':&lt;10}|")
print(f"右对齐: |{'hello':&gt;10}")
</code></pre>
<div class="tip"><strong>提示：</strong>Python是动态类型语言，变量的类型可以在运行时改变。使用 <code>type()</code> 函数可以随时查看变量的数据类型。在数据分析中，经常需要在数值类型和字符串类型之间转换。</div>
        `
      },
      {
        id: 'python-basics-03',
        title: '条件语句与循环',
        type: 'theory',
        duration: 25,
        content: `
<p>条件语句和循环是程序控制流的核心。在数据分析中，我们经常需要根据不同条件执行不同的逻辑，或者对数据进行批量处理。</p>
<h2>if/elif/else 条件判断</h2>
<pre><code class="language-python"># 成绩等级判断示例
score = 85

if score >= 90:
    grade = "优秀"
    comment = "表现非常出色！"
elif score >= 80:
    grade = "良好"
    comment = "继续保持！"
elif score >= 70:
    grade = "中等"
    comment = "还有提升空间"
elif score >= 60:
    grade = "及格"
    comment = "需要更加努力"
else:
    grade = "不及格"
    comment = "请认真复习"

print(f"成绩: {score} 分")
print(f"等级: {grade}")
print(f"评语: {comment}")
</code></pre>
<h2>比较运算符和逻辑运算符</h2>
<pre><code class="language-python"># 比较运算符
a, b = 100, 200
print(f"a == b: {a == b}")    # 等于
print(f"a != b: {a != b}")    # 不等于
print(f"a > b: {a > b}")      # 大于
print(f"a < b: {a < b}")      # 小于
print(f"a >= b: {a >= b}")    # 大于等于
print(f"a <= b: {a <= b}")    # 小于等于

# 逻辑运算符
score = 85
attendance = 0.95
print(f"优秀学员: {score >= 80 and attendance >= 0.9}")
print(f"需补考或重修: {score < 60 or attendance < 0.7}")
print(f"非及格: {not (score >= 60)}")
</code></pre>
<h2>for 循环和 range()</h2>
<pre><code class="language-python"># 遍历列表
products = ["笔记本电脑", "平板电脑", "智能手机", "智能手表"]
for product in products:
    print(f"商品: {product}")

# 使用 range() 生成数字序列
for i in range(5):
    print(f"第 {i+1} 次循环")

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# enumerate 同时获取索引和值
monthly_sales = [120000, 135000, 98000, 156000]
for idx, sale in enumerate(monthly_sales, start=1):
    print(f"{idx}月销售额: {sale:,} 元")
</code></pre>
<h2>while 循环</h2>
<pre><code class="language-python"># 累计销售直到达标
target = 500000
current = 0
month = 0
monthly = [120000, 135000, 98000, 156000, 142000]

while current < target and month < len(monthly):
    month += 1
    current += monthly[month - 1]
    print(f"第{month}月累计: {current:,} 元")

if current >= target:
    print(f"恭喜！第{month}月达成目标！")
</code></pre>
<h2>break 和 continue</h2>
<pre><code class="language-python"># break - 跳出整个循环
for num in range(1, 100):
    if num > 10:
        break
    print(num)  # 只打印 1-10

# continue - 跳过本次循环，继续下一次
for num in range(1, 11):
    if num % 2 == 0:
        continue
    print(num)  # 只打印奇数: 1, 3, 5, 7, 9
</code></pre>
<h2>嵌套循环 - 九九乘法表</h2>
<pre><code class="language-python"># 九九乘法表
for i in range(1, 10):
    for j in range(1, i + 1):
        print(f"{j}x{i}={i*j:2d}", end="  ")
    print()  # 换行
</code></pre>
<div class="warning"><strong>注意：</strong>使用 <code>while</code> 循环时务必确保循环条件最终会变为 <code>False</code>，否则会导致无限循环，程序将无法终止。建议在循环体内包含使条件趋向终止的逻辑。</div>
        `
      },
      {
        id: 'python-basics-04',
        title: '列表与字典',
        type: 'practice',
        duration: 25,
        initialCode: `# 数据分析中常用的数据结构练习
# 已知某公司季度销售数据
sales_q1 = [12500, 15800, 9200, 18600, 11300]
sales_q2 = [14200, 17500, 10100, 21000, 13800]

# TODO 1: 计算Q1和Q2的总销售额和平均销售额
# 提示：使用sum()和len()

# TODO 2: 找出Q2比Q1增长最多的产品（假设产品顺序对应）
# 提示：用zip()同时遍历两个列表

# TODO 3: 使用字典存储产品信息
# products = {"A": "笔记本电脑", "B": "无线耳机", ...}
# 将销售额与产品名称关联

# TODO 4: 筛选出Q2销售额超过15000的产品
`,
        expectedOutput: `Q1总销售额: 67,400
Q1平均销售额: 13,480.0
Q2总销售额: 76,600
Q2平均销售额: 15,320.0
Q2比Q1增长最多: 产品D, 增长额: 2,400
产品信息:
  A 笔记本电脑: Q1=12500, Q2=14200
  B 无线耳机: Q1=15800, Q2=17500
  C 机械键盘: Q1=9200, Q2=10100
  D 显示器: Q1=18600, Q2=21000
  E 鼠标: Q1=11300, Q2=13800
Q2销售额超过15000的产品: ['B', 'D']`,
        hints: [
          'sum()求和, len()求长度',
          'zip()可以同时遍历多个列表',
          '字典用{}创建，键值对用:分隔',
          '列表推导式或循环筛选'
        ],
        testCases: [
          { input: '', expected: 'Q1总销售额' }
        ]
      },
      {
        id: 'python-basics-05',
        title: '函数定义与使用',
        type: 'theory',
        duration: 20,
        content: `
<p>函数是组织好的、可重复使用的代码块。在数据分析中，将常用的计算逻辑封装为函数，可以提高代码的复用性和可读性。</p>
<h2>函数定义：def 关键字</h2>
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
<h2>参数与返回值</h2>
<pre><code class="language-python"># 多个返回值
def analyze_sales(data):
    """分析销售数据，返回多个统计指标"""
    total = sum(data)
    average = total / len(data)
    maximum = max(data)
    minimum = min(data)
    return total, average, maximum, minimum

sales = [1200, 3500, 2800, 4100, 1900]
total, avg, max_val, min_val = analyze_sales(sales)
print(f"总计: {total:,}, 平均: {avg:,.0f}")
print(f"最高: {max_val:,}, 最低: {min_val:,}")
</code></pre>
<h2>默认参数</h2>
<pre><code class="language-python"># 默认参数
def calculate_tax(amount, tax_rate=0.13):
    """计算税额，默认增值税率13%"""
    tax = amount * tax_rate
    return tax

print(f"增值税: {calculate_tax(100000):,.0f} 元")
print(f"企业所得税(25%): {calculate_tax(100000, 0.25):,.0f} 元")
</code></pre>
<h2>可变参数 *args 和 **kwargs</h2>
<pre><code class="language-python"># *args - 接收任意数量的位置参数
def calculate_average(*args):
    """计算任意多个数的平均值"""
    if len(args) == 0:
        return 0
    return sum(args) / len(args)

print(f"平均值: {calculate_average(80, 90, 85, 95):.1f}")

# **kwargs - 接收任意数量的关键字参数
def print_report(**kwargs):
    """打印报告信息"""
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_report(title="月度销售报告", month="2024年1月", author="张三")
</code></pre>
<h2>lambda 匿名函数</h2>
<pre><code class="language-python"># lambda - 简单的匿名函数
square = lambda x: x ** 2
print(f"5的平方: {square(5)}")

# 常与内置函数配合使用
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_nums = sorted(numbers, key=lambda x: -x)
print(f"降序排列: {sorted_nums}")
</code></pre>
<h2>常用内置函数：map, filter, sorted</h2>
<pre><code class="language-python"># map - 对每个元素应用函数
prices = ['299', '599', '1299']
prices_int = list(map(int, prices))
print(f"转换后: {prices_int}")

# filter - 筛选满足条件的元素
numbers = [12, 35, 8, 42, 17, 63, 29]
even_nums = list(filter(lambda x: x % 2 == 0, numbers))
print(f"偶数: {even_nums}")

# sorted - 排序
products = [
    {"name": "笔记本", "price": 5999},
    {"name": "鼠标", "price": 99},
    {"name": "键盘", "price": 399}
]
sorted_products = sorted(products, key=lambda x: x["price"])
for p in sorted_products:
    print(f"{p['name']}: {p['price']}元")
</code></pre>
<div class="tip"><strong>提示：</strong>函数是代码复用的基础。在数据分析项目中，将常用的数据清洗、计算和格式化逻辑封装为函数，可以大幅减少重复代码，提高开发效率和代码可维护性。</div>
        `
      },
      {
        id: 'python-basics-06',
        title: '字符串高级操作',
        type: 'practice',
        duration: 20,
        initialCode: `# 商务数据分析中的文本处理
raw_data = "  iPhone 15 Pro Max;  ¥8,999;  2024-01-15;  王明;  电子产品  "
raw_data2 = "MacBook Air M3;  ¥7,499;  2024-01-16;  李华;  电子产品"
raw_data3 = "AirPods Pro 2;  ¥1,799;  2024-01-16;  张伟;  配件"

# TODO 1: 将raw_data按分号分割，去除前后空格
# TODO 2: 提取价格并转换为数字（去除¥和逗号）
# TODO 3: 将日期格式从2024-01-15转换为"2024年1月15日"
# TODO 4: 使用函数批量处理多条数据
`,
        expectedOutput: `分割结果: ['iPhone 15 Pro Max', '¥8,999', '2024-01-15', '王明', '电子产品']
价格: 8999.0
格式化日期: 2024年1月15日
批量处理结果:
  iPhone 15 Pro Max - 8999.0元 - 2024年1月15日 - 王明 - 电子产品
  MacBook Air M3 - 7499.0元 - 2024年1月16日 - 李华 - 电子产品
  AirPods Pro 2 - 1799.0元 - 2024年1月16日 - 张伟 - 配件`,
        hints: [
          'split(";")分割, strip()去空格',
          'replace()去除特殊字符, float()转换',
          'split("-")分割日期, 分别提取年月日',
          '定义函数，参数为原始字符串，返回处理后的字典'
        ],
        testCases: [
          { input: '', expected: '批量处理结果' }
        ]
      },
      {
        id: 'python-basics-07',
        title: 'Python基础综合测验',
        type: 'quiz',
        duration: 15,
        content: [
          {
            question: 'Python中以下哪个不是基本数据类型？',
            options: ['int', 'float', 'str', 'list'],
            correct: 3,
            explanation: 'int、float、str是Python的基本数据类型，而list是序列数据类型（容器类型），不是基本数据类型。Python的基本数据类型包括int（整数）、float（浮点数）、str（字符串）和bool（布尔值）。'
          },
          {
            question: '"Hello"[1:4] 的结果是？',
            options: ['"Hel"', '"ell"', '"ello"', '"Hell"'],
            correct: 1,
            explanation: '字符串切片 [1:4] 表示从索引1（包含）到索引4（不包含）的子字符串。"Hello"的索引为 H(0)、e(1)、l(2)、l(3)、o(4)，因此 [1:4] 取出的是 "ell"。'
          },
          {
            question: '哪个方法可以向列表末尾添加元素？',
            options: ['append()', 'add()', 'insert()', 'push()'],
            correct: 0,
            explanation: 'append() 方法用于向列表末尾添加单个元素。add() 是集合的方法，insert() 用于在指定位置插入元素，push() 不是Python列表的方法。'
          },
          {
            question: 'Python中定义函数使用的关键字是？',
            options: ['function', 'func', 'def', 'define'],
            correct: 2,
            explanation: 'Python使用 def 关键字来定义函数，语法为 def function_name(parameters):。function、func 和 define 都不是Python中定义函数的关键字。'
          },
          {
            question: '以下哪个是正确的字典访问方式？',
            options: ['my_dict.key', 'my_dict["key"]', 'my_dict{key}', 'my_dict(key)'],
            correct: 1,
            explanation: 'Python字典使用方括号和键名来访问值，语法为 my_dict["key"]。点号访问（my_dict.key）用于对象属性，花括号用于创建字典，圆括号用于函数调用。'
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
        content: `
<p>Pandas是Python中最流行的数据处理和分析库，由Wes McKinney于2008年开发。它提供了高性能、易用的数据结构和数据分析工具，是数据科学工作流程中不可或缺的一环。</p>
<h2>Pandas简介</h2>
<p>Pandas的名字来源于"Panel Data"（面板数据）的缩写。它建立在NumPy之上，提供了两种核心数据结构：Series（一维）和DataFrame（二维）。Pandas能够轻松处理各种格式的数据，包括CSV、Excel、JSON、SQL数据库等。</p>
<h2>Series的创建</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

# 从列表创建Series
s1 = pd.Series([120, 350, 280, 410, 190])
print(s1)

# 从字典创建Series（自动使用键作为索引）
s2 = pd.Series({
    "笔记本电脑": 5990,
    "无线耳机": 299,
    "机械键盘": 599,
    "显示器": 3280
})
print(s2)

# 从NumPy数组创建Series
arr = np.array([85, 92, 78, 95, 88])
s3 = pd.Series(arr, index=["语文", "数学", "英语", "物理", "化学"])
print(s3)

# 指定名称
s4 = pd.Series([150000, 180000, 135000], name="月度销售额")
print(s4)
</code></pre>
<h2>Series的索引和切片</h2>
<pre><code class="language-python">s = pd.Series([120, 350, 280, 410, 190],
              index=["A", "B", "C", "D", "E"])

# 标签索引
print(s["A"])      # 120
print(s[["A", "C"]])  # A    120, C    280

# 位置索引（iloc）
print(s.iloc[0])    # 120
print(s.iloc[1:3])  # B    350, C    280

# 布尔索引
print(s[s > 200])   # 筛选大于200的元素

# 切片
print(s["B":"D"])   # 包含D（标签切片与位置切片不同）
</code></pre>
<h2>Series的属性</h2>
<pre><code class="language-python">s = pd.Series([120, 350, 280, 410, 190],
              index=["A", "B", "C", "D", "E"])

print(s.index)     # 索引
print(s.values)    # 值数组
print(s.dtype)     # 数据类型
print(s.shape)     # 形状
print(s.size)      # 元素个数
print(s.name)      # 名称
</code></pre>
<h2>Series的常用方法</h2>
<pre><code class="language-python">s = pd.Series([120, 350, 280, 410, 190, 350, 280])

# 描述性统计
print(s.describe())

# 值计数
print(s.value_counts())

# 排序
print(s.sort_values(ascending=False))

# 排名
print(s.rank(ascending=False))

# 去重
print(s.unique())

# 数学运算
print(s.sum())
print(s.mean())
print(s.median())
print(s.std())
print(s.max())
print(s.min())
</code></pre>
<div class="tip"><strong>提示：</strong>Series可以看作带索引的一维数组。与NumPy数组相比，Series最大的优势在于拥有灵活的索引机制，可以通过标签或位置进行数据访问，还支持自动对齐的运算。</div>
        `
      },
      {
        id: 'pandas-fundamentals-02',
        title: 'DataFrame基础',
        type: 'theory',
        duration: 25,
        content: `
<p>DataFrame是Pandas最核心的数据结构，它是一个二维的表格型数据结构，类似于Excel表格或SQL数据库中的表。每一列可以是不同的数据类型。</p>
<h2>DataFrame的创建</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

# 从字典创建DataFrame
data = {
    "产品": ["笔记本电脑", "无线耳机", "机械键盘", "显示器"],
    "价格": [5990, 299, 599, 3280],
    "销量": [100, 300, 250, 80],
    "评分": [4.8, 4.5, 4.6, 4.7]
}
df = pd.DataFrame(data)
print(df)

# 从列表的列表创建
data2 = [
    ["张三", "技术部", 15000],
    ["李四", "市场部", 12000],
    ["王五", "销售部", 18000]
]
df2 = pd.DataFrame(data2, columns=["姓名", "部门", "薪资"])
print(df2)

# 从NumPy数组创建
arr = np.random.randint(60, 100, size=(5, 3))
df3 = pd.DataFrame(arr, columns=["语文", "数学", "英语"])
print(df3)
</code></pre>
<h2>查看数据</h2>
<pre><code class="language-python"># head() - 查看前几行（默认5行）
print(df.head())

# tail() - 查看最后几行
print(df.tail(2))

# info() - 查看数据基本信息
print(df.info())

# describe() - 查看数值列的统计摘要
print(df.describe())

# 查看形状
print(df.shape)      # (行数, 列数)

# 查看列名
print(df.columns)

# 查看数据类型
print(df.dtypes)
</code></pre>
<h2>列操作</h2>
<pre><code class="language-python"># 选择单列
print(df["产品"])

# 选择多列
print(df[["产品", "价格"]])

# 添加新列
df["销售额"] = df["价格"] * df["销量"]
print(df)

# 删除列
df_drop = df.drop("评分", axis=1)
print(df_drop)

# 修改列名
df_rename = df.rename(columns={"价格": "单价"})
print(df_rename)

# 条件列
df["等级"] = df["评分"].apply(
    lambda x: "优秀" if x >= 4.7 else "良好"
)
print(df)
</code></pre>
<h2>数据类型</h2>
<pre><code class="language-python"># 查看各列数据类型
print(df.dtypes)

# 转换数据类型
df["价格"] = df["价格"].astype(float)
df["产品"] = df["产品"].astype(str)

# 查看内存使用
print(df.memory_usage())
</code></pre>
<div class="tip"><strong>提示：</strong>DataFrame是Pandas最核心的数据结构，几乎所有Pandas操作都围绕DataFrame展开。可以将DataFrame想象为一个由多个Series（列）组成的字典，每个Series共享相同的索引。</div>
        `
      },
      {
        id: 'pandas-fundamentals-03',
        title: '数据读取与查看',
        type: 'practice',
        duration: 25,
        initialCode: `import pandas as pd
import numpy as np

# 创建模拟销售数据
np.random.seed(42)
data = {
    '日期': pd.date_range('2024-01-01', periods=30),
    '产品': np.random.choice(['笔记本电脑', '无线耳机', '机械键盘', '显示器', '鼠标'], 30),
    '销售额': np.random.randint(500, 50000, 30),
    '数量': np.random.randint(1, 20, 30),
    '区域': np.random.choice(['华东', '华南', '华北', '西南'], 30)
}
df = pd.DataFrame(data)

# TODO 1: 查看前5行和最后3行
# TODO 2: 查看数据基本信息（行列数、列类型、非空值）
# TODO 3: 查看数值列的统计摘要
# TODO 4: 查看各产品的销售记录数
`,
        expectedOutput: `前5行:
         日期          产品    销售额  数量  区域
0 2024-01-01    显示器  31763   3  西南
1 2024-01-02  笔记本电脑  44134  16  华东
2 2024-01-03      鼠标  39819  12  华南
3 2024-01-04  机械键盘  46565  18  华北
4 2024-01-05  笔记本电脑  29233  12  西南
最后3行:
         日期    产品    销售额  数量  区域
27 2024-01-28  无线耳机  32628   5  华南
28 2024-01-29    显示器  48284  11  华东
29 2024-01-30  机械键盘  46027  17  华南
数据基本信息:
<class 'pandas.core.frame.DataFrame'>
RangeIndex: 30 entries, 0 to 29
Data columns (total 5 columns):
 #   Column  Non-Null Count  Dtype
---  ------  --------------  -----
 0   日期     30 non-null     datetime64[ns]
 1   产品     30 non-null     object
 2   销售额    30 non-null     int64
 3   数量     30 non-null     int64
 4   区域     30 non-null     object
dtypes: datetime64[ns](1), int64(2), object(2)
memory usage: 1.3+ KB
None
数值列统计:
              销售额         数量
count    30.000000   30.000000
mean  24847.366667   10.100000
std   14931.822556    5.233429
min     1024.000000    1.000000
25%   13306.250000    6.250000
50%   24457.500000   10.000000
75%   36392.750000   14.750000
max   49717.000000   19.000000
各产品销售记录数:
产品
无线耳机    7
显示器     6
机械键盘    6
笔记本电脑    6
鼠标      5
Name: count, dtype: int64`,
        hints: [
          'head()和tail()',
          'info()',
          'describe()',
          'value_counts()'
        ],
        testCases: [
          { input: '', expected: '前5行' }
        ]
      },
      {
        id: 'pandas-fundamentals-04',
        title: '数据筛选与过滤',
        type: 'practice',
        duration: 25,
        initialCode: `import pandas as pd
import numpy as np

np.random.seed(42)
data = {
    '产品': np.random.choice(['笔记本电脑', '无线耳机', '机械键盘', '显示器'], 50),
    '销售额': np.random.randint(1000, 50000, 50),
    '数量': np.random.randint(1, 30, 50),
    '区域': np.random.choice(['华东', '华南', '华北'], 50),
    '月份': np.random.randint(1, 13, 50)
}
df = pd.DataFrame(data)

# TODO 1: 筛选销售额大于20000的记录
# TODO 2: 筛选华东区域且数量大于10的记录
# TODO 3: 筛选产品为"笔记本电脑"或"显示器"的记录（用isin）
# TODO 4: 筛选销售额在前10的记录（用nlargest）
`,
        expectedOutput: `销售额大于20000的记录（共25条）:
          产品    销售额  数量  区域  月份
1   笔记本电脑  44134   3  华东    2
2   机械键盘  39819  12  华南    3
3   显示器  46565  18  华北    4
4   笔记本电脑  29233  12  西南    5
...
华东区域且数量大于10的记录（共8条）:
          产品    销售额  数量  区域  月份
2   机械键盘  39819  12  华南    3
3   显示器  46565  18  华北    4
...
笔记本电脑或显示器的记录（共25条）:
          产品    销售额  数量  区域  月份
1   笔记本电脑  44134   3  华东    2
3   显示器  46565  18  华北    4
...
销售额前10的记录:
          产品    销售额  数量  区域  月份
3   显示器  46565  18  华北    4
11  机械键盘  45249  15  华东   12
...`,
        hints: [
          'df[df["销售额"] > 20000]',
          '使用&连接条件，每个条件用括号包裹',
          'df[df["产品"].isin([...])]',
          'df.nlargest(10, "销售额")'
        ],
        testCases: [
          { input: '', expected: '销售额大于20000' }
        ]
      },
      {
        id: 'pandas-fundamentals-05',
        title: '数据排序与分组',
        type: 'practice',
        duration: 25,
        initialCode: `import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    '部门': np.random.choice(['技术部', '市场部', '销售部', '人事部'], 40),
    '员工': [f'员工{i}' for i in range(1, 41)],
    '薪资': np.random.randint(5000, 25000, 40),
    '绩效': np.random.choice(['A', 'B', 'C', 'D'], 40)
})

# TODO 1: 按薪资降序排列
# TODO 2: 按部门分组，计算每个部门的平均薪资
# TODO 3: 按部门和绩效分组，统计每组人数
# TODO 4: 找出每个部门薪资最高的员工
`,
        expectedOutput: `按薪资降序排列（前5名）:
   部门   员工    薪资 绩效
0  技术部  员工1  24747  B
2  销售部  员工3  24387  D
...
各部门平均薪资:
部门
人事部    14842.857143
市场部    14366.666667
技术部    15236.363636
销售部    13952.941176
Name: 薪资, dtype: float64
部门和绩效分组人数:
部门  绩效
人事部  A     2
      B     1
      C     2
      D     2
市场部  A     2
      B     1
      C     1
      D     1
技术部  A     2
      B     4
      C     3
      D     2
销售部  A     3
      B     3
      C     5
      D     5
dtype: int64
各部门薪资最高的员工:
   部门   员工    薪资 绩效
0  技术部  员工1  24747  B
1  市场部  员工2  22392  A
2  销售部  员工3  24387  D
3  人事部  员工4  22683  A`,
        hints: [
          'sort_values(by="薪资", ascending=False)',
          'groupby("部门")["薪资"].mean()',
          'groupby(["部门", "绩效"]).size()',
          'groupby("部门").apply(lambda x: x.nlargest(1, "薪资"))'
        ],
        testCases: [
          { input: '', expected: '按薪资降序排列' }
        ]
      },
      {
        id: 'pandas-fundamentals-06',
        title: '缺失值处理',
        type: 'theory',
        duration: 20,
        content: `
<p>在实际数据分析中，缺失值（Missing Values）是非常常见的问题。缺失值可能由于数据录入错误、设备故障、信息未收集等原因产生。正确处理缺失值是数据清洗的重要环节。</p>
<h2>缺失值的表示</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

# NaN (Not a Number) - 浮点数类型的缺失值
# None - Python内置的空值

# 创建包含缺失值的数据
data = {
    "姓名": ["张三", "李四", "王五", "赵六", "钱七"],
    "年龄": [28, np.nan, 35, 42, np.nan],
    "薪资": [15000, 12000, np.nan, 18000, 9000],
    "部门": ["技术部", None, "销售部", "技术部", "市场部"]
}
df = pd.DataFrame(data)
print(df)
</code></pre>
<h2>检测缺失值</h2>
<pre><code class="language-python"># isnull() / isna() - 检测每个值是否为缺失值
print(df.isnull())

# notnull() - 检测每个值是否非缺失值
print(df.notnull())

# 统计每列的缺失值数量
print(df.isnull().sum())

# 统计总缺失值数量
print(f"总缺失值: {df.isnull().sum().sum()}")

# 查看含有缺失值的行
print(df[df.isnull().any(axis=1)])
</code></pre>
<h2>处理缺失值</h2>
<pre><code class="language-python"># dropna() - 删除含有缺失值的行
df_clean = df.dropna()
print(df_clean)

# dropna(thresh=N) - 保留至少有N个非空值的行
df_thresh = df.dropna(thresh=3)
print(df_thresh)

# fillna() - 用指定值填充
df_filled = df.fillna(0)
print(df_filled)

# 用均值填充数值列
df["年龄"] = df["年龄"].fillna(df["年龄"].mean())
print(df)

# 用前一个有效值填充（前向填充）
df_ffill = df.fillna(method="ffill")
print(df_ffill)

# 用后一个有效值填充（后向填充）
df_bfill = df.fillna(method="bfill")
print(df_bfill)
</code></pre>
<h2>填充策略</h2>
<pre><code class="language-python"># 对不同列使用不同的填充策略
df["年龄"] = df["年龄"].fillna(df["年龄"].median())  # 中位数填充
df["薪资"] = df["薪资"].fillna(df["薪资"].mean())    # 均值填充
df["部门"] = df["部门"].fillna("未知")                 # 固定值填充

# 使用插值法填充
df["年龄"] = df["年龄"].interpolate(method="linear")

# 使用分组填充
# df["薪资"] = df.groupby("部门")["薪资"].transform(
#     lambda x: x.fillna(x.mean())
# )
</code></pre>
<div class="warning"><strong>注意：</strong>删除缺失值前要评估数据损失。如果缺失值比例较高（如超过20%），直接删除可能导致样本量大幅减少，影响分析结果。建议根据业务场景选择合适的填充策略。</div>
        `
      },
      {
        id: 'pandas-fundamentals-07',
        title: 'Pandas综合测验',
        type: 'quiz',
        duration: 15,
        content: [
          {
            question: '以下哪种方式可以正确创建一个DataFrame？',
            options: [
              'pd.DataFrame([1, 2, 3])',
              'pd.DataFrame({"A": [1, 2], "B": [3, 4]})',
              'pd.DataFrame("A": [1, 2], "B": [3, 4])',
              'DataFrame({"A": [1, 2], "B": [3, 4]})'
            ],
            correct: 1,
            explanation: 'pd.DataFrame({"A": [1, 2], "B": [3, 4]}) 是正确的创建方式，使用字典作为参数，键为列名，值为列表。选项A只传入一维列表会报错，选项C语法错误（不能在函数调用中使用冒号），选项D缺少pd前缀。'
          },
          {
            question: 'df.describe() 方法默认只对哪种类型的列进行统计？',
            options: ['所有列', '数值型列', '字符串列', '日期列'],
            correct: 1,
            explanation: 'df.describe() 默认只对数值型列（int64、float64）进行统计，包括计数、均值、标准差、最小值、四分位数和最大值。如果需要包含字符串列的统计，可以使用 df.describe(include="all")。'
          },
          {
            question: '以下哪个表达式可以筛选出"销售额"列大于10000的所有行？',
            options: [
              'df.query("销售额 > 10000")',
              'df[df["销售额"] > 10000]',
              'df.filter(销售额 > 10000)',
              'df.where(销售额 > 10000)'
            ],
            correct: 1,
            explanation: 'df[df["销售额"] > 10000] 使用布尔索引，是最常用和标准的筛选方式。虽然query()方法也能实现类似功能，但布尔索引是最基础和最灵活的方式。filter()用于选择列，where()会保留所有行但将不满足条件的设为NaN。'
          },
          {
            question: 'df.groupby("部门")["销售额"].mean() 的作用是什么？',
            options: [
              '计算所有销售额的平均值',
              '按部门分组后计算每组的销售额平均值',
              '按销售额排序后分组',
              '筛选出销售额大于平均值的部门'
            ],
            correct: 1,
            explanation: 'groupby("部门") 将数据按部门列进行分组，["销售额"] 选择销售额列，mean() 计算每组的平均值。这是Pandas中最常用的分组聚合操作之一。'
          },
          {
            question: '以下哪种方法最适合处理DataFrame中少量的缺失值？',
            options: [
              '直接删除所有含有缺失值的行',
              '使用 fillna() 用合理值填充',
              '忽略缺失值不做处理',
              '将整个DataFrame重置'
            ],
            correct: 1,
            explanation: '当缺失值数量较少时，使用 fillna() 用合理值（如均值、中位数或前值）填充是最合适的做法。直接删除会导致数据损失，忽略可能导致计算错误，重置DataFrame则完全不合理。'
          }
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
        content: `
<p>Matplotlib是Python中最基础、最广泛使用的数据可视化库。它能够生成出版质量级别的图表，支持多种图表类型和丰富的自定义选项。</p>
<h2>Matplotlib简介</h2>
<p>Matplotlib由John D. Hunter于2003年开发，其设计灵感来自MATLAB的绘图功能。虽然Matplotlib的API相对底层，但它提供了极大的灵活性，几乎所有其他Python可视化库（如Seaborn、Plotly）都建立在它之上。</p>
<h2>figure 和 axes 概念</h2>
<pre><code class="language-python">import matplotlib.pyplot as plt

# Figure - 整个画布（最外层的容器）
# Axes - 画布中的子图（实际的绘图区域）

# 创建一个Figure和一个Axes
fig, ax = plt.subplots(figsize=(8, 5))
ax.set_title("示例图表")
ax.plot([1, 2, 3, 4], [10, 20, 15, 25])
plt.show()

# 创建多个子图
fig, axes = plt.subplots(2, 2, figsize=(10, 8))
axes[0, 0].set_title("子图1")
axes[0, 1].set_title("子图2")
axes[1, 0].set_title("子图3")
axes[1, 1].set_title("子图4")
plt.tight_layout()
plt.show()
</code></pre>
<h2>基本绘图函数</h2>
<pre><code class="language-python">import matplotlib.pyplot as plt

# 折线图 - 展示数据变化趋势
plt.figure(figsize=(8, 4))
months = [1, 2, 3, 4, 5, 6]
sales = [120, 135, 98, 156, 142, 168]
plt.plot(months, sales, marker='o', linewidth=2)
plt.title("月度销售趋势")
plt.xlabel("月份")
plt.ylabel("销售额（万元）")
plt.show()

# 柱状图 - 展示分类数据对比
plt.figure(figsize=(8, 4))
categories = ['Q1', 'Q2', 'Q3', 'Q4']
values = [450, 520, 480, 610]
plt.bar(categories, values, color=['#4CAF50', '#2196F3', '#FF9800', '#F44336'])
plt.title("季度销售额对比")
plt.ylabel("销售额（万元）")
plt.show()

# 散点图 - 展示两个变量之间的关系
plt.figure(figsize=(8, 4))
x = [10, 20, 15, 30, 25, 35, 40, 22]
y = [50, 85, 65, 120, 95, 140, 160, 100]
plt.scatter(x, y, s=100, c='red', alpha=0.6)
plt.title("广告投入与销售额的关系")
plt.xlabel("广告投入（万元）")
plt.ylabel("销售额（万元）")
plt.show()

# 饼图 - 展示各部分占比
plt.figure(figsize=(6, 6))
labels = ['电子产品', '服装', '食品', '家居', '其他']
sizes = [35, 25, 20, 12, 8]
plt.pie(sizes, labels=labels, autopct='%1.1f%%', startangle=90)
plt.title("产品类别销售占比")
plt.show()
</code></pre>
<h2>图表美化</h2>
<pre><code class="language-python">import matplotlib.pyplot as plt

plt.figure(figsize=(10, 6))

# 绘制多条折线
months = range(1, 13)
sales_2023 = [45, 52, 48, 61, 55, 67, 72, 68, 59, 63, 71, 85]
sales_2024 = [52, 58, 55, 68, 63, 75, 82, 78, 65, 72, 80, 95]

plt.plot(months, sales_2023, 'b-o', label='2023年', linewidth=2)
plt.plot(months, sales_2024, 'r-s', label='2024年', linewidth=2)

# 添加标题和标签
plt.title("月度销售趋势对比", fontsize=16, fontweight='bold')
plt.xlabel("月份", fontsize=12)
plt.ylabel("销售额（万元）", fontsize=12)

# 添加图例
plt.legend(fontsize=12, loc='upper left')

# 添加网格线
plt.grid(True, alpha=0.3, linestyle='--')

# 设置坐标轴范围
plt.xlim(1, 12)
plt.ylim(40, 100)

plt.tight_layout()
plt.show()
</code></pre>
<h2>中文显示设置</h2>
<pre><code class="language-python"># 设置中文字体（根据操作系统不同选择）
import matplotlib.pyplot as plt

# 方法1：全局设置
plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False  # 解决负号显示问题

# 方法2：指定字体
from matplotlib.font_manager import FontProperties
font = FontProperties(fname='SimHei.ttf')
plt.title("中文标题", fontproperties=font)
</code></pre>
<div class="tip"><strong>提示：</strong>pyplot接口（plt.plot()、plt.bar()等）适合快速绘图和简单场景。对于更复杂的图表布局和自定义需求，推荐使用面向对象的API（fig, ax = plt.subplots()），它提供了更精细的控制。</div>
        `
      },
      {
        id: 'data-visualization-02',
        title: '折线图与柱状图',
        type: 'practice',
        duration: 25,
        initialCode: `import matplotlib.pyplot as plt
import numpy as np

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# 月度销售数据
months = ['1月', '2月', '3月', '4月', '5月', '6月',
          '7月', '8月', '9月', '10月', '11月', '12月']
sales_2023 = [45, 52, 48, 61, 55, 67, 72, 68, 59, 63, 71, 85]
sales_2024 = [52, 58, 55, 68, 63, 75, 82, 78, 65, 72, 80, 95]

# TODO 1: 绘制折线图对比2023和2024年月度销售趋势
# TODO 2: 添加标题、图例、网格线
# TODO 3: 绘制柱状图展示2024年各月销售额
`,
        expectedOutput: `折线图已绘制，展示了2023和2024年的月度销售趋势对比
柱状图已绘制，展示了2024年各月的销售额分布`,
        hints: [
          'plt.plot()绘制折线，label参数设置图例',
          'plt.title(), plt.xlabel(), plt.legend(), plt.grid()',
          'plt.bar()绘制柱状图'
        ],
        testCases: [
          { input: '', expected: '折线图已绘制' }
        ]
      },
      {
        id: 'data-visualization-03',
        title: '散点图与饼图',
        type: 'practice',
        duration: 20,
        initialCode: `import matplotlib.pyplot as plt
import numpy as np

plt.rcParams['font.sans-serif'] = ['SimHei', 'Arial Unicode MS', 'DejaVu Sans']
plt.rcParams['axes.unicode_minus'] = False

# 产品销售与广告投入数据
np.random.seed(42)
ad_spend = np.random.uniform(10, 100, 50)
sales = ad_spend * 2.5 + np.random.normal(0, 20, 50)

# 产品类别占比
categories = ['电子产品', '服装', '食品', '家居', '图书']
percentages = [35, 25, 20, 12, 8]

# TODO 1: 绘制散点图分析广告投入与销售额的关系
# TODO 2: 绘制饼图展示产品类别占比
`,
        expectedOutput: `散点图已绘制，展示了广告投入与销售额的正相关关系
饼图已绘制，展示了各产品类别的销售占比`,
        hints: [
          'plt.scatter(), 添加xlabel/ylabel',
          'plt.pie(), autopct参数显示百分比, startangle设置起始角度'
        ],
        testCases: [
          { input: '', expected: '散点图已绘制' }
        ]
      },
      {
        id: 'data-visualization-04',
        title: 'Seaborn高级可视化',
        type: 'theory',
        duration: 20,
        content: `
<p>Seaborn是基于Matplotlib的高级数据可视化库，由Michael Waskom开发。它提供了更简洁的API和更美观的默认样式，特别适合绘制统计图表。</p>
<h2>Seaborn简介与安装</h2>
<pre><code class="language-python"># 安装Seaborn
# pip install seaborn

import seaborn as sns
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd

# Seaborn版本
print(f"Seaborn版本: {sns.__version__}")

# 设置样式
sns.set_style("whitegrid")  # whitegrid, darkgrid, white, dark, ticks
sns.set_context("notebook")  # notebook, paper, talk, poster
</code></pre>
<h2>统计图表</h2>
<pre><code class="language-python"># 创建示例数据
np.random.seed(42)
df = pd.DataFrame({
    '部门': np.random.choice(['技术部', '市场部', '销售部', '人事部'], 100),
    '薪资': np.concatenate([
        np.random.normal(15000, 3000, 25),
        np.random.normal(12000, 2500, 25),
        np.random.normal(18000, 4000, 25),
        np.random.normal(10000, 2000, 25)
    ])
})

# 箱线图 - 展示数据分布和异常值
plt.figure(figsize=(10, 6))
sns.boxplot(x='部门', y='薪资', data=df)
plt.title("各部门薪资分布")
plt.show()

# 小提琴图 - 结合箱线图和核密度图
plt.figure(figsize=(10, 6))
sns.violinplot(x='部门', y='薪资', data=df)
plt.title("各部门薪资分布（小提琴图）")
plt.show()

# 热力图 - 展示相关性矩阵
plt.figure(figsize=(8, 6))
data_corr = pd.DataFrame({
    '销售额': [1.0, 0.85, 0.72, 0.45],
    '广告投入': [0.85, 1.0, 0.68, 0.52],
    '客流量': [0.72, 0.68, 1.0, 0.61],
    '满意度': [0.45, 0.52, 0.61, 1.0]
}, index=['销售额', '广告投入', '客流量', '满意度'])
sns.heatmap(data_corr, annot=True, cmap='coolwarm', center=0)
plt.title("指标相关性热力图")
plt.show()
</code></pre>
<h2>分布图</h2>
<pre><code class="language-python"># 直方图 + 核密度估计
plt.figure(figsize=(10, 6))
sns.histplot(df['薪资'], kde=True, bins=20)
plt.title("薪资分布直方图")
plt.show()

# 核密度估计图
plt.figure(figsize=(10, 6))
sns.kdeplot(data=df, x='薪资', hue='部门', fill=True, alpha=0.5)
plt.title("各部门薪资核密度分布")
plt.show()
</code></pre>
<h2>关系图</h2>
<pre><code class="language-python"># 散点图（带回归线）
np.random.seed(42)
df2 = pd.DataFrame({
    '广告投入': np.random.uniform(10, 100, 100),
    '销售额': None
})
df2['销售额'] = df2['广告投入'] * 2.5 + np.random.normal(0, 20, 100)

plt.figure(figsize=(10, 6))
sns.regplot(x='广告投入', y='销售额', data=df2)
plt.title("广告投入与销售额关系")
plt.show()

# 成对关系图
iris = sns.load_dataset('iris')
sns.pairplot(iris, hue='species')
plt.show()

# 分类关系图
plt.figure(figsize=(10, 6))
sns.relplot(x='广告投入', y='销售额', data=df2, kind='scatter')
plt.title("关系图示例")
plt.show()
</code></pre>
<h2>样式设置</h2>
<pre><code class="language-python"># Seaborn内置样式
# sns.set_style("whitegrid")  # 白色背景+网格
# sns.set_style("darkgrid")   # 深色背景+网格
# sns.set_style("white")       # 白色背景无网格
# sns.set_style("dark")        # 深色背景无网格
# sns.set_style("ticks")       # 带刻度线

# 调色板
# sns.set_palette("deep")      # 深色调色板
# sns.set_palette("muted")     # 柔和调色板
# sns.set_palette("pastel")    # 粉色调色板
# sns.set_palette("colorblind") # 色盲友好调色板

# 使用with语句临时设置样式
with sns.axes_style("darkgrid"):
    plt.figure(figsize=(8, 5))
    sns.barplot(x=['A', 'B', 'C'], y=[10, 25, 18])
    plt.title("临时样式示例")
    plt.show()
</code></pre>
<div class="tip"><strong>提示：</strong>Seaborn基于Matplotlib，提供更美观的默认样式和更简洁的统计图表API。大多数Seaborn函数都接受DataFrame作为输入，能够自动处理数据映射和图例生成，大幅简化了绑图代码。</div>
        `
      },
      {
        id: 'data-visualization-05',
        title: '数据可视化综合测验',
        type: 'quiz',
        duration: 15,
        content: [
          {
            question: '展示数据随时间变化的趋势，最适合使用哪种图表？',
            options: ['柱状图', '折线图', '饼图', '散点图'],
            correct: 1,
            explanation: '折线图最适合展示数据随时间变化的趋势，因为它能够清晰地呈现数据的上升、下降和波动情况。折线图通过连接各个数据点，使趋势一目了然。'
          },
          {
            question: '在Matplotlib中，plt.subplots(2, 3) 会创建什么样的布局？',
            options: ['2行3列共6个子图', '3行2列共6个子图', '2行3列共5个子图', '2个主图和3个子图'],
            correct: 0,
            explanation: 'plt.subplots(2, 3) 的第一个参数是行数，第二个参数是列数，因此创建的是2行3列共6个子图的布局。返回值是一个Figure对象和一个2x3的Axes数组。'
          },
          {
            question: '以下哪种图表最适合展示各部分占整体的比例？',
            options: ['柱状图', '折线图', '饼图', '散点图'],
            correct: 2,
            explanation: '饼图最适合展示各部分占整体的比例关系。饼图将一个圆划分为多个扇形，每个扇形的大小与其所代表的比例成正比，能够直观地展示各部分的占比情况。'
          },
          {
            question: 'Seaborn相比Matplotlib的主要优势是什么？',
            options: [
              '绘图速度更快',
              '默认样式更美观，统计图表API更简洁',
              '支持更多图表类型',
              '不需要安装其他依赖'
            ],
            correct: 1,
            explanation: 'Seaborn的主要优势在于提供更美观的默认样式和更简洁的统计图表API。它基于Matplotlib构建，专门针对统计可视化进行了优化，能够用更少的代码创建更专业的统计图表。'
          },
          {
            question: '箱线图（Box Plot）中，箱体表示的是什么？',
            options: [
              '数据的平均值和标准差范围',
              '数据的最小值和最大值范围',
              '数据的四分位距（IQR）',
              '数据的95%置信区间'
            ],
            correct: 2,
            explanation: '箱线图的箱体表示数据的四分位距（IQR），即从第一四分位数（Q1，25%位置）到第三四分位数（Q3，75%位置）的范围。箱体中间的线代表中位数（Q2，50%位置）。'
          }
        ]
      }
    ]
  },

// PART1_END  },

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
        content: `
<p>描述性统计是数据分析的第一步，通过计算各种统计指标来概括数据的整体特征。它帮助我们快速了解数据的集中趋势、离散程度和分布形态。</p>
<h3>集中趋势度量</h3>
<p>集中趋势反映数据的"中心位置"：</p>
<pre><code class="language-python">import numpy as np
import pandas as pd

# 模拟一组销售数据（单位：万元）
sales = [12.5, 8.3, 15.2, 7.8, 22.1, 9.6, 13.4, 11.2, 18.7, 10.5,
         14.3, 8.9, 16.1, 12.8, 9.2, 11.5, 13.7, 10.8, 15.6, 8.1]

# 均值（Mean）
mean_val = np.mean(sales)
print(f"均值: {mean_val:.2f}")

# 中位数（Median）
median_val = np.median(sales)
print(f"中位数: {median_val:.2f}")

# 众数（Mode）- 使用pandas
mode_val = pd.Series(sales).mode()[0]
print(f"众数: {mode_val}")
</code></pre>
<h3>离散程度度量</h3>
<p>离散程度反映数据的分散情况：</p>
<pre><code class="language-python"># 方差（Variance）
var_val = np.var(sales, ddof=1)  # ddof=1 为样本方差
print(f"样本方差: {var_val:.2f}")

# 标准差（Standard Deviation）
std_val = np.std(sales, ddof=1)
print(f"样本标准差: {std_val:.2f}")

# 极差（Range）
range_val = max(sales) - min(sales)
print(f"极差: {range_val:.2f}")

# 四分位距（IQR）
q1 = np.percentile(sales, 25)
q3 = np.percentile(sales, 75)
iqr = q3 - q1
print(f"Q1: {q1:.2f}, Q3: {q3:.2f}, IQR: {iqr:.2f}")
</code></pre>
<h3>分布形态</h3>
<pre><code class="language-python">from scipy import stats

# 偏度（Skewness）- 衡量分布的不对称性
skewness = stats.skew(sales)
print(f"偏度: {skewness:.2f}")
# 正偏度：右尾较长；负偏度：左尾较长；0：对称

# 峰度（Kurtosis）- 衡量分布的尖峰程度
kurtosis = stats.kurtosis(sales)
print(f"峰度: {kurtosis:.2f}")
# 正值：比正态分布更尖；负值：比正态分布更平
</code></pre>
<h3>使用Pandas一次性计算</h3>
<pre><code class="language-python">df = pd.DataFrame({'销售额': sales})
print(df.describe())
</code></pre>
<div class="tip"><strong>💡 提示：</strong>均值容易受极端值影响，中位数更稳健。当数据中存在异常值或分布严重偏斜时，中位数比均值更能代表数据的"典型值"。</div>
        `
      },
      {
        id: 'statistics-fundamentals-02',
        title: '概率分布',
        type: 'theory',
        duration: 25,
        content: `
<p>概率分布描述了随机变量取各个值的概率规律。理解常见的概率分布是进行统计推断和建模的基础。</p>
<h3>离散概率分布</h3>
<h4>二项分布（Binomial Distribution）</h4>
<p>描述n次独立试验中成功次数的概率分布。</p>
<pre><code class="language-python">from scipy import stats
import numpy as np

# 二项分布：抛硬币10次，出现正面的次数
n, p = 10, 0.5
binom_dist = stats.binom(n, p)

# 恰好出现5次正面
print(f"恰好5次正面: {binom_dist.pmf(5):.4f}")

# 最多出现6次正面
print(f"最多6次正面: {binom_dist.cdf(6):.4f}")

# 生成随机数
samples = binom_dist.rvs(size=1000)
print(f"1000次模拟的均值: {np.mean(samples):.2f}")
</code></pre>
<h4>泊松分布（Poisson Distribution）</h4>
<p>描述单位时间/空间内稀有事件发生次数的分布。</p>
<pre><code class="language-python"># 泊松分布：每小时平均到达3个客户
lam = 3
poisson_dist = stats.poisson(lam)

print(f"恰好到达3个: {poisson_dist.pmf(3):.4f}")
print(f"到达不超过5个: {poisson_dist.cdf(5):.4f}")
</code></pre>
<h3>连续概率分布</h3>
<h4>正态分布（Normal Distribution）</h4>
<p>自然界中最常见的分布，也称高斯分布。</p>
<pre><code class="language-python"># 正态分布：均值0，标准差1（标准正态分布）
norm_dist = stats.norm(loc=0, scale=1)

# 概率密度函数（PDF）
print(f"P(X=0): {norm_dist.pdf(0):.4f}")

# 累积分布函数（CDF）
print(f"P(X<=1.96): {norm_dist.cdf(1.96):.4f}")
print(f"P(X<=-1.96): {norm_dist.cdf(-1.96):.4f}")

# 生成随机数
samples = norm_dist.rvs(size=1000)
print(f"样本均值: {np.mean(samples):.4f}")
print(f"样本标准差: {np.std(samples):.4f}")
</code></pre>
<h4>均匀分布（Uniform Distribution）</h4>
<pre><code class="language-python"># 均匀分布：[0, 1]区间
uniform_dist = stats.uniform(loc=0, scale=1)
print(f"P(X<=0.5): {uniform_dist.cdf(0.5):.4f}")

# 生成随机数
samples = uniform_dist.rvs(size=1000)
print(f"样本均值: {np.mean(samples):.4f}")
</code></pre>
<h3>概率密度函数与累积分布函数</h3>
<pre><code class="language-python"># PDF vs CDF 对比
x = np.linspace(-4, 4, 100)
pdf_values = norm_dist.pdf(x)
cdf_values = norm_dist.cdf(x)

# PDF：某一点的概率密度（面积=概率）
# CDF：累积概率 P(X <= x)
print("PDF在x=0处:", norm_dist.pdf(0))
print("CDF在x=0处:", norm_dist.cdf(0))
print("PDF在x=1.96处:", norm_dist.pdf(1.96))
print("CDF在x=1.96处:", norm_dist.cdf(1.96))
</code></pre>
<div class="tip"><strong>💡 提示：</strong>正态分布是自然界最常见的分布。中心极限定理告诉我们，大量独立随机变量的均值近似服从正态分布，这就是为什么正态分布在统计推断中如此重要。</div>
        `
      },
      {
        id: 'statistics-fundamentals-03',
        title: '假设检验入门',
        type: 'practice',
        duration: 25,
        initialCode: `import numpy as np
from scipy import stats

# 场景：某电商平台声称其平均订单金额为200元
# 我们抽样了50笔订单，检验这个说法是否成立

np.random.seed(42)
# 模拟真实平均订单金额为215元
sample = np.random.normal(215, 40, 50)

# TODO 1: 计算样本均值和标准差
# sample_mean = ?
# sample_std = ?

# TODO 2: 进行单样本t检验（假设总体均值=200）
# t_stat, p_value = stats.ttest_1samp(sample, 200)

# TODO 3: 判断是否拒绝原假设（显著性水平0.05）
# if p_value < 0.05: print("拒绝原假设")
# else: print("不能拒绝原假设")

# TODO 4: 计算置信区间
# 使用t分布计算95%置信区间`,
        hints: [
          'np.mean()和np.std(ddof=1)',
          'stats.ttest_1samp(sample, popmean)',
          'p值小于0.05时拒绝原假设',
          'stats.t.interval(0.95, df=len(sample)-1, loc=sample_mean, scale=sample_std/np.sqrt(len(sample)))'
        ],
        testCases: [
          { input: '', expected: '样本均值' }
        ]
      },
      {
        id: 'statistics-fundamentals-04',
        title: '相关性与回归分析',
        type: 'practice',
        duration: 25,
        initialCode: `import numpy as np
import pandas as pd
from scipy import stats

# 广告投入与销售额数据
np.random.seed(42)
ad_spend = np.linspace(10, 100, 30)
sales = 50 + 3.2 * ad_spend + np.random.normal(0, 15, 30)

# TODO 1: 计算Pearson相关系数
# r, p_value = stats.pearsonr(ad_spend, sales)

# TODO 2: 使用numpy进行简单线性回归
# slope, intercept = np.polyfit(ad_spend, sales, 1)

# TODO 3: 计算决定系数R²
# predictions = slope * ad_spend + intercept
# ss_res = sum((sales - predictions)**2)
# ss_tot = sum((sales - np.mean(sales))**2)
# r_squared = 1 - ss_res / ss_tot

# TODO 4: 预测广告投入80万元时的销售额
# predicted_sales = slope * 80 + intercept`,
        hints: [
          'stats.pearsonr(x, y)返回相关系数和p值',
          'np.polyfit(x, y, 1)进行线性拟合',
          'R² = 1 - SS_res/SS_tot',
          '用拟合的线性方程代入x=80'
        ],
        testCases: [
          { input: '', expected: '相关系数' }
        ]
      },
      {
        id: 'statistics-fundamentals-05',
        title: '统计分析综合测验',
        type: 'quiz',
        duration: 15,
        questions: [
          {
            question: '以下哪个指标最能反映数据的"典型值"，且不受极端值影响？',
            options: ['均值', '中位数', '众数', '标准差'],
            correct: 1,
            explanation: '中位数不受极端值影响，是描述数据中心位置最稳健的指标。均值会被极端值拉偏，众数只反映出现频率最高的值。'
          },
          {
            question: '在假设检验中，P值的含义是什么？',
            options: ['原假设为真的概率', '在原假设为真条件下观察到当前或更极端结果的概率', '备择假设为真的概率', '犯第一类错误的概率'],
            correct: 1,
            explanation: 'P值是在原假设为真的前提下，观察到当前样本或更极端情况的概率。P值越小，说明在原假设下观察到当前结果越不可能，从而越有理由拒绝原假设。'
          },
          {
            question: '相关系数 r = -0.85 表示什么？',
            options: ['弱正相关', '强负相关', '无相关', '中等正相关'],
            correct: 1,
            explanation: '相关系数r的范围是[-1, 1]。r = -0.85表示强负相关，即一个变量增大时另一个变量倾向于减小，且线性关系很强。'
          },
          {
            question: '决定系数 R² = 0.81 的正确解读是？',
            options: ['预测准确率为81%', '自变量可解释因变量81%的变异', '相关系数为0.81', '误差率为19%'],
            correct: 1,
            explanation: 'R²表示回归模型中自变量对因变量变异的解释比例。R² = 0.81意味着模型中的自变量可以解释因变量81%的变异，剩余19%由其他因素导致。'
          },
          {
            question: '哪种分布最适合描述"每小时到达客服中心的电话数量"？',
            options: ['正态分布', '二项分布', '泊松分布', '均匀分布'],
            correct: 2,
            explanation: '泊松分布专门用于描述单位时间或空间内稀有事件发生的次数。客服电话到达是一个典型的泊松过程，因此泊松分布最为合适。'
          }
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
        content: `
<p>openpyxl是Python中操作Excel文件（.xlsx格式）的主流库。通过Python脚本自动化Excel操作，可以大幅提升办公效率，避免重复性劳动。</p>
<h3>openpyxl库简介</h3>
<p>openpyxl是一个用于读写Excel 2010 xlsx/xlsm/xltx/xltm文件的Python库。它不需要安装Microsoft Excel，可以独立运行。</p>
<pre><code class="language-python"># 安装openpyxl（在本地环境中）
# pip install openpyxl

# 导入openpyxl
from openpyxl import Workbook, load_workbook
print("openpyxl已准备就绪！")
</code></pre>
<h3>工作簿、工作表、单元格</h3>
<p>Excel文件的三个核心层级：</p>
<ul>
  <li><strong>工作簿（Workbook）</strong>：一个Excel文件就是一个工作簿</li>
  <li><strong>工作表（Worksheet）</strong>：工作簿中的每个标签页就是一个工作表</li>
  <li><strong>单元格（Cell）</strong>：工作表中的每个格子，通过行列坐标定位（如A1、B2）</li>
</ul>
<pre><code class="language-python"># 创建新工作簿
wb = Workbook()

# 获取活动工作表（默认创建的第一个工作表）
ws = wb.active
ws.title = "我的数据表"

# 也可以创建新工作表
ws2 = wb.create_sheet(title="汇总表")

print(f"工作表数量: {len(wb.worksheets)}")
print(f"工作表名称: {wb.sheetnames}")
</code></pre>
<h3>创建和保存Excel文件</h3>
<pre><code class="language-python">from openpyxl import Workbook

wb = Workbook()
ws = wb.active

# 写入数据
ws['A1'] = '姓名'
ws['B1'] = '销售额'
ws['A2'] = '张三'
ws['B2'] = 150000

# 保存文件
wb.save('demo.xlsx')
print("文件已保存为 demo.xlsx")
</code></pre>
<h3>读取Excel文件</h3>
<pre><code class="language-python"># 读取已有文件
wb = load_workbook('demo.xlsx')
ws = wb.active

# 读取单元格
print(f"A1: {ws['A1'].value}")
print(f"B2: {ws['B2'].value}")

# 遍历数据
for row in ws.iter_rows(values_only=True):
    print(row)
</code></pre>
<h3>单元格操作</h3>
<pre><code class="language-python"># 读写单元格
ws['C1'] = '利润率'
ws['C2'] = 0.15

# 使用行列号访问
ws.cell(row=3, column=1, value='李四')
ws.cell(row=3, column=2, value=200000)

# 批量写入
data = [['王五', 180000], ['赵六', 165000]]
for row_data in data:
    ws.append(row_data)

print(f"数据行数: {ws.max_row}")
print(f"数据列数: {ws.max_column}")
</code></pre>
<div class="tip"><strong>💡 提示：</strong>openpyxl可以处理.xlsx格式的文件。如果需要处理旧版的.xls格式，可以使用xlrd和xlwt库，但建议统一使用.xlsx格式。</div>
        `
      },
      {
        id: 'excel-analysis-02',
        title: '读写Excel文件',
        type: 'practice',
        duration: 25,
        initialCode: `from openpyxl import Workbook, load_workbook
import os

# 创建销售报表
wb = Workbook()
ws = wb.active
ws.title = "销售数据"

# TODO 1: 写入表头
# headers = ["日期", "产品", "销售额", "数量", "区域"]
# 使用ws.append()或逐个单元格写入

# TODO 2: 写入示例数据（至少5行）
# data = [
#   ["2024-01-15", "笔记本电脑", 29900, 3, "华东"],
#   ...
# ]

# TODO 3: 保存到文件
# wb.save("sales_report.xlsx")

# TODO 4: 读取刚保存的文件并打印所有数据
# wb2 = load_workbook("sales_report.xlsx")
# ws2 = wb2.active
# for row in ws2.iter_rows(values_only=True):
#     print(row)

print("Excel操作完成！")`,
        hints: [
          'ws.append(headers)添加一行',
          'ws.append(row_data)逐行添加',
          'wb.save("filename.xlsx")',
          'load_workbook("filename.xlsx")读取, iter_rows(values_only=True)遍历'
        ],
        testCases: [
          { input: '', expected: 'Excel操作完成' }
        ]
      },
      {
        id: 'excel-analysis-03',
        title: '数据格式化',
        type: 'practice',
        duration: 20,
        initialCode: `from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side

wb = Workbook()
ws = wb.active

# 写入数据
headers = ["产品", "Q1销售额", "Q2销售额", "Q3销售额", "Q4销售额", "合计"]
ws.append(headers)

products = [
    ["笔记本电脑", 125000, 142000, 158000, 175000],
    ["无线耳机", 45000, 52000, 48000, 61000],
    ["机械键盘", 28000, 32000, 35000, 38000],
]
for p in products:
    row = p + [sum(p[1:])]
    ws.append(row)

# TODO 1: 设置表头样式（加粗、蓝色背景、居中）
# Font(bold=True), PatternFill("solid", fgColor="4472C4")

# TODO 2: 设置数字格式为千分位
# number_format = '#,##0'

# TODO 3: 添加边框
# Border的四个边: left, right, top, bottom

# TODO 4: 设置列宽自适应
# column_dimensions['A'].width = 15

wb.save("formatted_report.xlsx")
print("格式化报表已生成！")`,
        hints: [
          'Font(bold=True, color="FFFFFF"), PatternFill填充色',
          'cell.number_format = "#,##0"',
          'Side(style="thin")创建边框线',
          'ws.column_dimensions[列字母].width = 数值'
        ],
        testCases: [
          { input: '', expected: '格式化报表已生成' }
        ]
      },
      {
        id: 'excel-analysis-04',
        title: '公式与图表生成',
        type: 'theory',
        duration: 20,
        content: `
<p>openpyxl不仅支持数据读写，还能向Excel中写入公式和创建图表。这使得Python可以生成包含计算逻辑和可视化效果的完整报表。</p>
<h3>Excel公式写入</h3>
<p>在openpyxl中，可以直接向单元格写入Excel公式字符串：</p>
<pre><code class="language-python">from openpyxl import Workbook

wb = Workbook()
ws = wb.active

# 写入数据
ws['A1'] = '产品'
ws['B1'] = 'Q1'
ws['C1'] = 'Q2'
ws['D1'] = '合计'
ws['A2'] = '笔记本电脑'
ws['B2'] = 125000
ws['C2'] = 142000

# 写入公式
ws['D2'] = '=SUM(B2:C2)'
ws['D3'] = '=AVERAGE(B2:C2)'
ws['D4'] = '=COUNT(B2:C2)'
ws['D5'] = '=IF(B2>130000,"达标","未达标")'
ws['D6'] = '=VLOOKUP("笔记本电脑",A2:C2,3,FALSE)'

print("公式已写入！")
print("注意：公式需要在Excel中打开才能计算结果")
print("openpyxl只能写入公式，不会执行公式计算")
</code></pre>
<h3>常用公式</h3>
<ul>
  <li><strong>SUM</strong>：求和，如 <code>=SUM(B1:B10)</code></li>
  <li><strong>AVERAGE</strong>：平均值，如 <code>=AVERAGE(B1:B10)</code></li>
  <li><strong>COUNT</strong>：计数，如 <code>=COUNT(B1:B10)</code></li>
  <li><strong>IF</strong>：条件判断，如 <code>=IF(B1>100,"高","低")</code></li>
  <li><strong>VLOOKUP</strong>：垂直查找，如 <code>=VLOOKUP(值,区域,列号,0)</code></li>
</ul>
<h3>使用openpyxl.charting创建图表</h3>
<pre><code class="language-python">from openpyxl import Workbook
from openpyxl.chart import BarChart, LineChart, PieChart, Reference

wb = Workbook()
ws = wb.active

# 准备数据
ws.append(['月份', '销售额', '利润'])
for i, (s, p) in enumerate(zip([120, 135, 98, 156, 142, 168],
                                [36, 47, 29, 54, 48, 60]), 1):
    ws.append([f'{i}月', s, p])

# 柱状图
chart1 = BarChart()
chart1.title = "月度销售额"
chart1.x_axis.title = "月份"
chart1.y_axis.title = "金额（万元）"
data = Reference(ws, min_col=2, min_row=1, max_row=7)
cats = Reference(ws, min_col=1, min_row=2, max_row=7)
chart1.add_data(data, titles_from_data=True)
chart1.set_categories(cats)
chart1.shape = 4
ws.add_chart(chart1, "E2")

# 折线图
chart2 = LineChart()
chart2.title = "月度趋势"
chart2.add_data(data, titles_from_data=True)
chart2.set_categories(cats)
ws.add_chart(chart2, "E18")

wb.save("chart_demo.xlsx")
print("图表已生成！")
</code></pre>
<h3>图表类型</h3>
<ul>
  <li><strong>BarChart</strong>：柱状图，适合比较不同类别的数值</li>
  <li><strong>LineChart</strong>：折线图，适合展示趋势变化</li>
  <li><strong>PieChart</strong>：饼图，适合展示占比关系</li>
</ul>
<div class="tip"><strong>💡 提示：</strong>openpyxl的图表功能不如Excel原生丰富。如果需要创建复杂的图表，建议在Python中使用matplotlib/seaborn生成图片，然后插入到Excel中。</div>
        `
      },
      {
        id: 'excel-analysis-05',
        title: 'Excel综合测验',
        type: 'quiz',
        duration: 15,
        questions: [
          {
            question: 'openpyxl中，如何获取活动工作表？',
            options: ['wb.active', 'wb.current', 'wb.sheet', 'wb.get_sheet()'],
            correct: 0,
            explanation: 'wb.active 返回工作簿中的活动工作表。这是openpyxl中最常用的获取工作表的方式。'
          },
          {
            question: '如何向工作表添加一行数据？',
            options: ['ws.add([data])', 'ws.append([data])', 'ws.insert([data])', 'ws.write([data])'],
            correct: 1,
            explanation: 'ws.append() 方法将一行数据添加到工作表的末尾。它接受一个列表或元组作为参数。'
          },
          {
            question: 'openpyxl中设置单元格字体加粗的正确写法？',
            options: ['Font(bold=1)', 'Font(bold=True)', 'Font(weight="bold")', 'Font(style="bold")'],
            correct: 2,
            explanation: 'Font(bold=True) 是正确的写法。bold参数接受布尔值True/False来控制字体是否加粗。'
          },
          {
            question: '如何设置数字显示为千分位格式？',
            options: ['cell.format = "#,##0"', 'cell.number_format = \'#,##0\'', 'cell.style = "thousands"', 'cell.display = "#,##0"'],
            correct: 1,
            explanation: 'cell.number_format = \'#,##0\' 将单元格的数字格式设置为千分位显示。number_format支持所有Excel内置格式。'
          },
          {
            question: 'openpyxl.charting中创建柱状图使用哪个类？',
            options: ['BarChart', 'ColumnChart', 'HistogramChart', 'VerticalBarChart'],
            correct: 0,
            explanation: 'openpyxl中使用 BarChart 类来创建柱状图。虽然Excel中称为"柱形图"，但openpyxl统一使用BarChart类名。'
          }
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
        duration: 20,
        content: `
<p>欢迎进入商务数据实战项目！本课程将综合运用前面学到的Python、Pandas、统计分析和Excel操作知识，完成真实的商务数据分析项目。</p>
<h3>项目背景介绍</h3>
<p>假设你是一家电商公司的数据分析师，公司积累了大量的销售数据。管理层希望你能从数据中发现业务洞察，为决策提供数据支撑。</p>
<h3>数据分析流程</h3>
<p>一个完整的数据分析项目通常包含以下步骤：</p>
<pre><code class="language-python"># 标准数据分析流程
# 1. 数据获取（Data Acquisition）
#    - 从数据库、文件、API获取原始数据

# 2. 数据清洗（Data Cleaning）
#    - 处理缺失值、异常值、重复数据
#    - 数据类型转换、格式统一

# 3. 数据分析（Data Analysis）
#    - 描述性统计
#    - 分组对比分析
#    - 相关性分析
#    - 趋势分析

# 4. 数据可视化（Visualization）
#    - 图表展示关键指标
#    - 制作数据仪表盘

# 5. 报告撰写（Reporting）
#    - 总结关键发现
#    - 提出业务建议
#    - 制定行动计划
</code></pre>
<h3>KPI指标定义</h3>
<p>在分析之前，需要明确关键绩效指标（KPI）：</p>
<ul>
  <li><strong>总销售额（GMV）</strong>：所有订单金额的总和</li>
  <li><strong>订单数量</strong>：成交订单总数</li>
  <li><strong>平均订单金额（AOV）</strong>：总销售额 / 订单数量</li>
  <li><strong>客单价</strong>：总销售额 / 顾客数量</li>
  <li><strong>转化率</strong>：成交客户数 / 访客数</li>
</ul>
<h3>分析维度</h3>
<p>从多个维度对数据进行切分分析：</p>
<ul>
  <li><strong>时间维度</strong>：日/周/月/季度/年度趋势</li>
  <li><strong>产品维度</strong>：品类表现、Top产品、产品关联</li>
  <li><strong>区域维度</strong>：各区域销售对比、区域潜力分析</li>
  <li><strong>渠道维度</strong>：线上vs线下、各渠道效率对比</li>
</ul>
<div class="tip"><strong>💡 提示：</strong>好的分析报告要有明确的数据支撑和业务建议。不要只罗列数字，要告诉决策者"这意味着什么"以及"建议怎么做"。</div>
        `
      },
      {
        id: 'business-project-02',
        title: '客户分群分析',
        type: 'practice',
        duration: 30,
        initialCode: `import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler

# 模拟客户数据
np.random.seed(42)
n = 200
df = pd.DataFrame({
    '客户ID': range(1, n+1),
    '消费总额': np.random.exponential(5000, n),
    '购买次数': np.random.randint(1, 50, n),
    '平均客单价': 0,
    '最近购买天数': np.random.randint(1, 365, n)
})
df['平均客单价'] = df['消费总额'] / df['购买次数']

# TODO 1: 计算RFM指标
# R(Recency): 最近购买天数（越小越好）
# F(Frequency): 购买次数（越大越好）
# M(Monetary): 消费总额（越大越好）

# TODO 2: 对RFM进行标准化
# scaler = StandardScaler()
# rfm_scaled = scaler.fit_transform(rfm_data)

# TODO 3: 使用简单的分箱法将客户分为4个等级
# 对每个R/F/M维度按四分位数分箱，标签为1-4

# TODO 4: 计算RFM总分并分析客户分层
# 分数越高，客户价值越大`,
        hints: [
          'R/F/M已经包含在数据中，提取即可',
          'StandardScaler().fit_transform()标准化',
          'pd.qcut()按分位数分箱',
          '将R、F、M的等级相加得到总分'
        ],
        testCases: [
          { input: '', expected: 'RFM' }
        ]
      },
      {
        id: 'business-project-03',
        title: '库存预测',
        type: 'practice',
        duration: 30,
        initialCode: `import pandas as pd
import numpy as np

# 模拟12个月库存数据
np.random.seed(42)
months = pd.date_range('2024-01-01', periods=12, freq='MS')
product_a = np.random.randint(100, 500, 12) + np.linspace(0, 100, 12).astype(int)
product_b = np.random.randint(200, 600, 12) + np.linspace(0, 50, 12).astype(int)
product_c = np.random.randint(50, 300, 12)

df = pd.DataFrame({
    '月份': months,
    '产品A': product_a,
    '产品B': product_b,
    '产品C': product_c
})

# TODO 1: 计算各产品的月均销量和标准差
# TODO 2: 计算各产品的趋势（线性回归斜率）
# TODO 3: 预测下个月的销量（趋势+季节性）
# TODO 4: 计算安全库存（均值+1.5*标准差）`,
        hints: [
          'mean()和std()',
          'np.polyfit(range(12), sales, 1)获取斜率',
          '用趋势外推一个月',
          '安全库存 = mean + z * std, z通常取1.5-2'
        ],
        testCases: [
          { input: '', expected: '产品' }
        ]
      },
      {
        id: 'business-project-04',
        title: '综合项目实战',
        type: 'practice',
        duration: 40,
        initialCode: `import pandas as pd
import numpy as np

np.random.seed(42)
n_records = 500
products = ['笔记本电脑', '无线耳机', '机械键盘', '显示器', '鼠标垫',
            '移动硬盘', '蓝牙音箱', '平板电脑']
regions = ['华东区', '华南区', '华北区', '西南区']
channels = ['线上', '线下']

base_prices = {'笔记本电脑': 5990, '无线耳机': 299, '机械键盘': 599,
               '显示器': 3280, '鼠标垫': 99, '移动硬盘': 459,
               '蓝牙音箱': 499, '平板电脑': 3299}

data = []
for _ in range(n_records):
    month = np.random.randint(1, 13)
    product = np.random.choice(products)
    region = np.random.choice(regions)
    channel = np.random.choice(channels, p=[0.6, 0.4])
    ctype = np.random.choice(['VIP', '普通'], p=[0.3, 0.7])
    price = base_prices[product] * (1 if ctype == '普通' else 0.95)
    quantity = max(1, int(np.random.exponential(5)))
    if ctype == 'VIP': quantity = int(quantity * 1.5)
    data.append({'月份': month, '产品': product, '区域': region,
                 '渠道': channel, '客户类型': ctype,
                 '单价': round(price), '销量': quantity})

df = pd.DataFrame(data)
df['销售额'] = df['单价'] * df['销量']
df['季度'] = df['月份'].apply(lambda m: f"Q{(m-1)//3 + 1}")

# TODO 1: 整体KPI（总销售额、总订单数、平均订单金额）
# TODO 2: 月度趋势分析
# TODO 3: 产品Top5分析
# TODO 4: 区域分析
# TODO 5: 渠道对比
# TODO 6: 客户类型分析
# TODO 7: 季度环比增长

print("=" * 60)
print("电商年度数据分析报告")
print("=" * 60)`,
        hints: [
          'df["销售额"].sum()计算总额',
          'groupby("月份")月度分析',
          'sort_values().head(5)获取Top5',
          'pct_change()计算环比增长',
          'crosstab()交叉分析'
        ],
        testCases: [
          { input: '', expected: '电商年度数据分析报告' }
        ]
      }
    ]
  },

  // ============================================================
  // 课程7：购物篮分析技术
  // ============================================================
  {
    id: 'market-basket',
    title: '购物篮分析技术',
    icon: '🛒',
    difficulty: 'intermediate',
    description: '学习关联规则挖掘与购物篮分析，掌握Apriori算法，发现商品间的关联关系',
    category: '商务智能',
    lessons: [
      {
        id: 'market-basket-01',
        title: '购物篮分析概述',
        type: 'theory',
        duration: 20,
        content: `
<p>购物篮分析（Market Basket Analysis）是一种数据挖掘技术，用于发现顾客购买行为中商品之间的关联关系。它是零售行业最经典的数据分析方法之一。</p>
<h3>购物篮分析定义</h3>
<p>购物篮分析通过分析顾客的购买记录（"购物篮"），找出哪些商品经常被一起购买，从而揭示商品之间的关联模式。</p>
<h3>经典案例：啤酒与尿布</h3>
<p>购物篮分析最著名的案例来自沃尔玛：数据分析师发现，每到周五晚上，啤酒和尿布经常被一起购买。进一步调查发现，年轻父亲在周末被妻子安排买尿布时，会顺便为自己买啤酒。沃尔玛据此将这两种商品摆放在一起，销售额显著提升。</p>
<h3>核心概念</h3>
<ul>
  <li><strong>事务（Transaction）</strong>：一次购买行为，包含一组商品。例如：{牛奶, 面包, 鸡蛋}</li>
  <li><strong>项集（Itemset）</strong>：商品的集合。包含k个商品的项集称为k-项集。例如：{啤酒, 尿布}是2-项集</li>
  <li><strong>支持度（Support）</strong>：项集在所有事务中出现的频率<br>Support(A) = 包含A的事务数 / 总事务数</li>
  <li><strong>置信度（Confidence）</strong>：购买A的条件下购买B的概率<br>Confidence(A→B) = Support(A,B) / Support(A)</li>
  <li><strong>提升度（Lift）</strong>：A和B一起出现的频率与随机期望的比值<br>Lift(A→B) = Support(A,B) / (Support(A) × Support(B))</li>
</ul>
<h3>应用场景</h3>
<ul>
  <li><strong>商品推荐</strong>："购买此商品的人还购买了..."</li>
  <li><strong>货架摆放</strong>：将关联商品放在相邻位置</li>
  <li><strong>促销组合</strong>：将关联商品打包促销</li>
  <li><strong>库存管理</strong>：关联商品同步备货</li>
</ul>
<div class="tip"><strong>💡 提示：</strong>提升度（Lift）是判断关联规则是否有价值的关键指标。Lift > 1表示正相关，Lift = 1表示独立，Lift < 1表示负相关。实际应用中通常关注Lift > 1的规则。</div>
<div class="warning"><strong>⚠️ 注意：</strong>关联规则只反映统计上的关联性，不代表因果关系。啤酒和尿布一起购买并不意味着买啤酒导致买尿布，只是说明两者之间存在关联。</div>
        `
      },
      {
        id: 'market-basket-02',
        title: 'Apriori算法原理',
        type: 'theory',
        duration: 25,
        content: `
<p>Apriori算法是最经典的频繁项集挖掘算法，由Agrawal和Srikant于1994年提出。它是购物篮分析的核心算法。</p>
<h3>Apriori算法简介</h3>
<p>Apriori算法的目标是从大量事务数据中找出满足最小支持度要求的频繁项集，然后基于频繁项集生成关联规则。</p>
<h3>先验性质（Apriori Property）</h3>
<p>Apriori算法的核心思想基于一个重要性质：</p>
<p><strong>如果一个项集是频繁的，那么它的所有子集也必须是频繁的。</strong></p>
<p>反之，如果一个项集是非频繁的，那么它的所有超集也一定是非频繁的。</p>
<pre><code class="language-python"># 先验性质示例
# 假设 {面包, 黄油, 牛奶} 是频繁的（支持度 >= min_support）
# 那么它的所有子集也必须是频繁的：
#   {面包, 黄油}    ✓ 频繁
#   {面包, 牛奶}    ✓ 频繁
#   {黄油, 牛奶}    ✓ 频繁
#   {面包}          ✓ 频繁
#   {黄油}          ✓ 频繁
#   {牛奶}          ✓ 频繁

# 反过来，如果 {面包, 黄油} 是非频繁的
# 那么任何包含 {面包, 黄油} 的超集都不需要检查：
#   {面包, 黄油, 牛奶}  ✗ 一定非频繁（无需计算）
#   {面包, 黄油, 鸡蛋}  ✗ 一定非频繁（无需计算）
</code></pre>
<h3>算法步骤</h3>
<p>Apriori算法采用逐层搜索的策略：</p>
<pre><code class="language-python"># Apriori算法步骤：
#
# 第1步：扫描数据库，计算每个单项的支持度
#   → 得到频繁1-项集 L1
#
# 第2步：由 L1 生成候选2-项集 C2
#   → 扫描数据库计算支持度
#   → 得到频繁2-项集 L2
#
# 第3步：由 L2 生成候选3-项集 C3
#   → 利用先验性质剪枝
#   → 扫描数据库计算支持度
#   → 得到频繁3-项集 L3
#
# ... 重复直到无法生成新的频繁项集
#
# 最终：从频繁项集生成关联规则
</code></pre>
<h3>优缺点分析</h3>
<p><strong>优点：</strong></p>
<ul>
  <li>算法简单，易于理解和实现</li>
  <li>先验性质有效减少了候选集数量</li>
  <li>适合中小规模数据集</li>
</ul>
<p><strong>缺点：</strong></p>
<ul>
  <li>需要多次扫描数据库（k-项集需要k次扫描）</li>
  <li>候选集可能仍然很大（组合爆炸问题）</li>
  <li>对大规模数据集效率较低</li>
</ul>
<pre><code class="language-python"># 候选集数量增长示例
# 假设有100种商品，频繁1-项集有50个
# 候选2-项集: C(50,2) = 1225
# 候选3-项集: C(50,3) = 19600
# 候选4-项集: C(50,4) = 230300
# → 候选集数量随项集大小急剧增长！
</code></pre>
<div class="tip"><strong>💡 提示：</strong>对于大规模数据集，可以考虑使用FP-Growth算法，它不需要生成候选集，效率更高。mlxtend库同时提供了Apriori和FP-Growth的实现。</div>
        `
      },
      {
        id: 'market-basket-03',
        title: 'Python实现购物篮数据准备',
        type: 'practice',
        duration: 25,
        initialCode: `import pandas as pd
import numpy as np

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

# TODO 1: 将transactions转换为DataFrame
# TODO 2: 统计每个商品的出现次数
# TODO 3: 计算每个商品的支持度
print("购物篮数据准备完成！")`,
        hints: [
          'pd.DataFrame',
          'collections.Counter',
          '出现次数/总事务数'
        ],
        testCases: [
          { input: '', expected: '购物篮数据准备完成' }
        ]
      },
      {
        id: 'market-basket-04',
        title: '手动实现Apriori算法',
        type: 'practice',
        duration: 35,
        initialCode: `import pandas as pd
import numpy as np
from itertools import combinations

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

min_support = 0.1
min_confidence = 0.5

# TODO 1: 实现calc_support函数
# TODO 2: 实现apriori函数
# TODO 3: 实现generate_rules函数
print("Apriori算法实现完成！")`,
        hints: [
          '遍历transactions检查子集',
          '先找频繁1-项集再逐层扩展',
          '枚举子集计算置信度和提升度'
        ],
        testCases: [
          { input: '', expected: 'Apriori算法实现完成' }
        ]
      },
      {
        id: 'market-basket-05',
        title: '使用mlxtend库进行购物篮分析',
        type: 'practice',
        duration: 30,
        initialCode: `import pandas as pd
import numpy as np
from mlxtend.preprocessing import TransactionEncoder
from mlxtend.frequent_patterns import apriori, association_rules

np.random.seed(42)
products = ['牛奶', '面包', '鸡蛋', '啤酒', '尿布', '可乐', '薯片', '黄油', '苹果', '咖啡']
n_transactions = 300
transactions = []
for _ in range(n_transactions):
    basket = set(np.random.choice(products, size=np.random.randint(2, 6), replace=False))
    if '尿布' in basket and np.random.random() < 0.7:
        basket.add('啤酒')
    if '面包' in basket and np.random.random() < 0.6:
        basket.add('黄油')
    if '咖啡' in basket and np.random.random() < 0.5:
        basket.add('薯片')
    transactions.append(list(basket))

# TODO 1: TransactionEncoder转换为布尔矩阵
# TODO 2: apriori找出频繁项集
# TODO 3: association_rules生成关联规则
# TODO 4: 筛选高价值规则
print("mlxtend购物篮分析完成！")`,
        hints: [
          'TransactionEncoder().fit().transform()',
          'apriori(df, min_support=0.05)',
          'association_rules(freq_items, metric="confidence")',
          'lift > 1.5 且 support > 0.1'
        ],
        testCases: [
          { input: '', expected: 'mlxtend购物篮分析完成' }
        ]
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
            explanation: '支持度是项集在所有事务中出现的频率，即包含该项集的事务数除以总事务数。Support(A) = count(A) / N。'
          },
          {
            question: '提升度（Lift）大于1表示什么？',
            options: ['A和B负相关', 'A和B相互独立', 'A和B正相关，一起出现的频率高于随机期望', 'A导致B发生'],
            correct: 2,
            explanation: 'Lift > 1 表示A和B正相关，一起出现的频率高于随机情况下的期望值。Lift = 1表示独立，Lift < 1表示负相关。'
          },
          {
            question: 'Apriori算法的先验性质是指？',
            options: ['频繁项集的超集一定频繁', '频繁项集的所有子集也必须是频繁的', '非频繁项集的子集一定频繁', '支持度高的项集置信度也一定高'],
            correct: 1,
            explanation: 'Apriori的核心性质：如果一个项集是频繁的，那么它的所有子集也必须是频繁的。这个性质用于剪枝，减少候选集数量。'
          },
          {
            question: 'Support({尿布})=30%, Support({啤酒})=40%, Support({尿布,啤酒})=21%, 那么Lift(尿布→啤酒)是多少？',
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
