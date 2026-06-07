const COURSES_DATA_NEW = [
  // ============================================================
  // 课程1：Python数据分析基础
  // ============================================================
  {
    id: 'python-basics',
    title: 'Python数据分析基础',
    icon: '🐍',
    difficulty: 'beginner',
    description: '从零开始学习Python编程，掌握数据分析必备的编程基础。本课程参考《Python编程：从入门到实践》和《Python数据科学手册》，涵盖Python基础语法、数据结构、文件操作、面向对象编程及NumPy科学计算，为数据分析打下坚实基础。',
    category: '编程基础',
    chapters: [
      // ==================== 第一章 ====================
      {
        id: 'python-ch1',
        title: '第一章：Python环境搭建与基础语法',
        lessons: [
          {
            id: 'python-basics-01',
            title: 'Python环境搭建与第一个程序',
            type: 'theory',
            duration: 20,
            content: `
<p>Python是一种广泛使用的高级编程语言，由Guido van Rossum于1991年首次发布。因其简洁优雅的语法和强大的生态系统，Python已成为数据分析、人工智能和科学计算领域的首选语言。本章将从环境搭建开始，带你迈入Python编程的世界。</p>
<h2>Python语言简介</h2>
<p>Python的设计哲学强调代码的可读性和简洁性。它的名字来源于英国喜剧团体"Monty Python"，而非蟒蛇。经过三十多年的发展，Python已经从一个简单的脚本语言成长为全球最受欢迎的编程语言之一。在TIOBE编程语言排行榜中，Python常年位居前列。</p>
<h2>Python在数据分析领域的优势</h2>
<ul>
  <li><strong>语法简洁易学</strong>：Python代码接近自然语言，初学者也能快速上手</li>
  <li><strong>丰富的数据科学生态</strong>：Pandas、NumPy、Matplotlib、Scikit-learn等库覆盖了数据分析全流程</li>
  <li><strong>强大的社区支持</strong>：海量教程、文档和开源项目可供参考</li>
  <li><strong>良好的兼容性</strong>：支持多种数据格式（CSV、Excel、JSON、数据库等）</li>
  <li><strong>跨平台运行</strong>：Windows、macOS、Linux均可使用</li>
</ul>
<h2>安装Python环境</h2>
<p>推荐从Python官网（python.org）下载最新稳定版Python 3.x。安装时请务必勾选"Add Python to PATH"选项，这将使你能够在命令行中直接运行Python。你也可以使用Anaconda发行版，它预装了数据分析所需的大量库。</p>
<pre><code class="language-python"># 验证Python安装
# 在命令行中输入：
# python --version
# pip --version

# 经典的Hello World程序
print("Hello, 数据分析!")

# 简单的计算示例
revenue = 150000
cost = 98000
profit = revenue - cost
print(f"利润: {profit} 元")
print(f"利润率: {profit / revenue * 100:.1f}%")
</code></pre>
<h2>注释的使用</h2>
<pre><code class="language-python"># 这是单行注释，用井号开头

"""
这是多行注释（文档字符串）
可以跨越多行
常用于函数和类的说明文档
"""

# 注释的作用：
# 1. 解释代码的逻辑和意图
# 2. 临时禁用某行代码（调试时）
# 3. 为团队协作提供文档说明
</code></pre>
<h2>使用pip管理包</h2>
<pre><code class="language-python"># pip是Python的包管理工具
# 在命令行中使用：

# 安装包: pip install pandas
# 升级包: pip install --upgrade pandas
# 查看已安装的包: pip list
# 卸载包: pip uninstall pandas
</code></pre>
<div class="tip"><strong>提示：</strong>Python是解释型语言，不需要编译。代码从上到下逐行执行，这使得开发和调试非常方便。推荐使用Jupyter Notebook进行数据分析，它支持代码、文本、图表的混合展示。</div>
<div class="warning"><strong>注意：</strong>Python对缩进敏感！Python使用缩进（通常4个空格）来表示代码块，而不是使用大括号。缩进不一致会导致IndentationError错误，这是初学者最常遇到的问题之一。</div>
            `
          },
          {
            id: 'python-basics-02',
            title: '变量与数据类型',
            type: 'theory',
            duration: 20,
            content: `
<p>变量是程序中存储数据的容器，数据类型决定了数据的性质和可执行的操作。Python是动态类型语言，变量不需要事先声明类型，赋值时自动确定类型。掌握变量和数据类型是Python编程的基础。</p>
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

# Python关键字列表
import keyword
print(keyword.kwlist)

# 命名最佳实践（snake_case风格）
total_sales_amount = 128500
customer_age_average = 35
</code></pre>
<h2>基本数据类型</h2>
<pre><code class="language-python"># 1. 整数 (int)
product_price = 299
quantity = 50
total = product_price * quantity
print(f"类型: {type(product_price)}, 总价: {total}")

# Python支持任意大小的整数
big_number = 2 ** 100
print(f"2的100次方: {big_number}")

# 2. 浮点数 (float)
exchange_rate = 6.89
usd_amount = 1000.00
cny_amount = usd_amount * exchange_rate
print(f"人民币: {cny_amount:.2f}")

# 浮点数精度问题
print(0.1 + 0.2)  # 0.30000000000000004

# 3. 字符串 (str)
product_name = "商务数据分析课程"
description = '适合零基础学员'

# 4. 布尔值 (bool)
is_vip = True
has_discount = False

# 5. NoneType
result = None
print(f"类型: {type(result)}")
</code></pre>
<h2>类型转换</h2>
<pre><code class="language-python"># int() - 转换为整数
price_str = "199"
price_int = int(price_str)
print(f"字符串转整数: {price_int}, 类型: {type(price_int)}")

# float() - 转换为浮点数
price_float = float("199.99")

# str() - 转换为字符串
num = 42
num_str = str(num)

# bool() - 转换为布尔值
print(bool(0))       # False
print(bool(1))       # True
print(bool(""))      # False
print(bool("hello")) # True
print(bool([]))      # False
print(bool([1, 2]))  # True
</code></pre>
<div class="key-point"><strong>重点：</strong>Python中，以下值在布尔上下文中被视为False：None、False、零值数字（0, 0.0）、空序列（'', [], (), set()）和空字典{}。其他所有值都被视为True。</div>
<div class="warning"><strong>注意：</strong>浮点数运算存在精度问题。0.1 + 0.2 的结果不是精确的0.3。在涉及金额等需要精确计算的场景中，应使用 decimal 模块。</div>
            `
          },
          {
            id: 'python-basics-03',
            title: '运算符与字符串操作',
            type: 'theory',
            duration: 20,
            content: `
<p>运算符是执行各种运算的符号，字符串操作是数据处理中最常见的任务之一。本课时将详细介绍Python中的各类运算符和字符串处理方法。</p>
<h2>算术运算符</h2>
<pre><code class="language-python">a, b = 17, 5
print(f"a + b = {a + b}")   # 加法: 22
print(f"a - b = {a - b}")   # 减法: 12
print(f"a * b = {a * b}")   # 乘法: 85
print(f"a / b = {a / b}")   # 除法: 3.4
print(f"a // b = {a // b}") # 整除: 3
print(f"a % b = {a % b}")   # 取模: 2
print(f"a ** b = {a ** b}") # 幂运算: 1419857

# 数据分析中的运算示例
total_revenue = 1258000
num_orders = 342
avg_order_value = total_revenue / num_orders
print(f"平均订单金额: {avg_order_value:.2f} 元")
</code></pre>
<h2>比较运算符与逻辑运算符</h2>
<pre><code class="language-python"># 比较运算符
a, b = 100, 200
print(f"a == b: {a == b}")    # False
print(f"a != b: {a != b}")    # True
print(f"a > b: {a > b}")      # False

# 逻辑运算符
score = 85
attendance = 0.95
print(f"优秀学员: {score >= 80 and attendance >= 0.9}")  # True
print(f"需补考: {score < 60 or attendance < 0.7}")        # False
print(f"非及格: {not (score >= 60)}")                     # False

# 链式比较
x = 50
print(0 < x < 100)   # True
</code></pre>
<h2>赋值运算符</h2>
<pre><code class="language-python">x = 10
x += 5    # x = x + 5 = 15
x -= 3    # x = x - 3 = 12
x *= 2    # x = x * 2 = 24
x /= 4    # x = x / 4 = 6.0

# 多重赋值
a, b, c = 1, 2, 3

# 交换变量（Python特有）
a, b = b, a
</code></pre>
<h2>字符串操作详解</h2>
<pre><code class="language-python"># 字符串索引与切片
text = "Python数据分析"
print(text[0])    # P
print(text[-1])   # 析
print(text[0:6])     # Python
print(text[6:])      # 数据分析
print(text[::-1])    # 析据数nohtyP

# 常用字符串方法
email = "  User@Example.COM  "
print(email.strip())           # 去除两端空白
print(email.strip().lower())   # 转小写
print(email.strip().split("@"))  # 分割

# f-string格式化
name = "张三"
sales = 128500
print(f"销售员 {name} 销售额: {sales:,} 元")
print(f"百分比: {0.856:.1%}")
print(f"千位分隔符: {1000000:,}")
</code></pre>
<div class="key-point"><strong>重点：</strong>f-string（格式化字符串字面量）是Python 3.6+推荐的字符串格式化方式。在花括号中可以放置任意Python表达式，支持格式说明符，比旧的 % 格式化和 str.format() 方法更易读且性能更好。</div>
            `
          },
          {
            id: 'python-basics-04',
            title: '变量与数据类型练习',
            type: 'practice',
            duration: 25,
            content: `
<p>通过以下练习巩固变量、数据类型和字符串操作的知识。请完成所有TODO标记的任务。</p>
<h2>练习任务</h2>
<pre><code class="language-python"># ========== 练习1：销售数据计算 ==========
product_name = "MacBook Pro"
unit_price = 14999
quantity_sold = 85
discount_rate = 0.08

# TODO 1: 计算总销售额（折扣前）
# TODO 2: 计算折扣金额
# TODO 3: 计算实际收入
# TODO 4: 使用f-string格式化输出，金额使用千位分隔符和2位小数

# ========== 练习2：字符串处理 ==========
raw_data = "2024-03-15|iPhone 15 Pro|8999|128|北京"

# TODO 5: 使用split方法分割数据
# TODO 6: 提取日期、商品名、单价、数量、城市
# TODO 7: 将单价和数量转换为整数
# TODO 8: 计算该笔订单的总金额

# ========== 练习3：类型判断与转换 ==========
inputs = ["42", "3.14", "True", "hello", "100", "0"]

# TODO 9: 遍历inputs列表，尝试将每个元素转换为最合适的类型
# TODO 10: 统计转换后各类型的数量
</code></pre>
<div class="tip"><strong>提示：</strong>使用 <code>split("|")</code> 按分隔符分割字符串。类型转换时使用 <code>try/except</code> 处理可能的异常。</div>
            `
          },
          {
            id: 'python-basics-05',
            title: '第一章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对Python基础语法、变量、数据类型和运算符的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第二章 ====================
      {
        id: 'python-ch2',
        title: '第二章：流程控制与函数',
        lessons: [
          {
            id: 'python-basics-06',
            title: '条件语句详解',
            type: 'theory',
            duration: 20,
            content: `
<p>条件语句是程序控制流的核心组成部分。在数据分析中，我们经常需要根据不同条件执行不同的逻辑，例如根据数值范围分类数据、根据业务规则筛选记录等。</p>
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

print(f"成绩: {score} 分, 等级: {grade}, 评语: {comment}")
</code></pre>
<h2>条件表达式（三元运算符）</h2>
<pre><code class="language-python"># 三元运算符语法: 值1 if 条件 else 值2
age = 20
status = "成年" if age >= 18 else "未成年"

# 数据分析中的应用
value = -5
category = "正数" if value > 0 else ("负数" if value < 0 else "零")

# 客户分群
def customer_segment(amount, frequency):
    if amount >= 10000 and frequency >= 10:
        return "钻石客户"
    elif amount >= 5000 or frequency >= 5:
        return "黄金客户"
    elif amount >= 1000:
        return "白银客户"
    else:
        return "普通客户"

print(customer_segment(15000, 12))  # 钻石客户
</code></pre>
<div class="key-point"><strong>重点：</strong>Python使用缩进来标识代码块。每个if/elif/else后面都要有冒号。elif可以有任意多个分支，else分支是可选的。</div>
<div class="warning"><strong>注意：</strong>避免在条件判断中使用 == 比较浮点数，应使用 <code>abs(a - b) < 1e-9</code> 这样的方式比较。</div>
            `
          },
          {
            id: 'python-basics-07',
            title: '循环结构详解',
            type: 'theory',
            duration: 25,
            content: `
<p>循环结构允许我们重复执行一段代码，是批量处理数据的基础。Python提供了for循环和while循环两种主要结构。</p>
<h2>for 循环</h2>
<pre><code class="language-python"># 遍历列表
products = ["笔记本电脑", "平板电脑", "智能手机"]
for product in products:
    print(f"商品: {product}")

# range() 生成数字序列
for i in range(5):
    print(f"第 {i+1} 次循环")

# range(start, stop, step)
for i in range(0, 10, 2):
    print(i)  # 0, 2, 4, 6, 8

# enumerate 同时获取索引和值
monthly_sales = [120000, 135000, 98000, 156000]
for idx, sale in enumerate(monthly_sales, start=1):
    print(f"{idx}月销售额: {sale:,} 元")

# zip 同时遍历多个序列
months = ["一月", "二月", "三月", "四月"]
sales = [120000, 135000, 98000, 156000]
for month, sale in zip(months, sales):
    print(f"{month}: {sale:,} 元")

# 字典遍历
scores = {"语文": 92, "数学": 88, "英语": 95}
for subject, score in scores.items():
    print(f"{subject}: {score}分")
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
<h2>break、continue与列表推导式</h2>
<pre><code class="language-python"># break - 跳出整个循环
for num in range(1, 100):
    if num > 10:
        break
    print(num)  # 只打印 1-10

# continue - 跳过本次循环
for num in range(1, 11):
    if num % 2 == 0:
        continue
    print(num)  # 只打印奇数

# 列表推导式
squares = [x**2 for x in range(10)]
print(squares)  # [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件的列表推导式
even_squares = [x**2 for x in range(10) if x % 2 == 0]
print(even_squares)  # [0, 4, 16, 36, 64]

# 字典推导式
prices = {"苹果": 5, "香蕉": 3, "橙子": 4}
discounted = {k: v * 0.9 for k, v in prices.items()}
</code></pre>
<div class="tip"><strong>提示：</strong>列表推导式是Python的特色语法，比等价的for循环更简洁高效。但在推导式过于复杂时应改用普通for循环。</div>
<div class="warning"><strong>注意：</strong>使用 <code>while</code> 循环时务必确保循环条件最终会变为 <code>False</code>，否则会导致无限循环。</div>
            `
          },
          {
            id: 'python-basics-08',
            title: '函数定义与调用',
            type: 'theory',
            duration: 25,
            content: `
<p>函数是组织好的、可重复使用的代码块。在数据分析中，将常用的数据处理逻辑封装为函数，可以提高代码的复用性和可维护性。</p>
<h2>函数基本语法</h2>
<pre><code class="language-python"># 基本函数定义
def greet(name):
    """向用户打招呼的函数"""
    return f"你好, {name}! 欢迎学习数据分析。"

message = greet("张三")
print(message)

# 带默认参数的函数
def calculate_tax(price, tax_rate=0.13):
    tax_amount = price * tax_rate
    return round(price + tax_amount, 2)

print(calculate_tax(100))         # 113.0
print(calculate_tax(100, 0.06))  # 106.0
</code></pre>
<h2>参数类型</h2>
<pre><code class="language-python"># 可变位置参数 *args
def calculate_average(*numbers):
    if not numbers:
        return 0
    return sum(numbers) / len(numbers)

print(calculate_average(85, 92, 78, 95))  # 87.5

# 可变关键字参数 **kwargs
def print_info(**kwargs):
    for key, value in kwargs.items():
        print(f"{key}: {value}")

print_info(name="张三", age=25, city="北京")

# 返回多个值（实际返回元组）
def min_max(data):
    return min(data), max(data)

minimum, maximum = min_max([10, 20, 30, 40, 50])
print(f"最小值: {minimum}, 最大值: {maximum}")

# 返回字典
def analyze_sales(sales_data):
    return {
        "total": sum(sales_data),
        "average": sum(sales_data) / len(sales_data),
        "max": max(sales_data),
        "min": min(sales_data),
        "count": len(sales_data)
    }
</code></pre>
<h2>Lambda表达式</h2>
<pre><code class="language-python"># lambda语法: lambda 参数: 表达式
square = lambda x: x ** 2
print(square(5))  # 25

# 常与内置函数配合使用
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
sorted_desc = sorted(numbers, key=lambda x: -x)  # 降序

# 按字符串长度排序
words = ["banana", "apple", "cherry", "date"]
sorted_words = sorted(words, key=lambda w: len(w))

# 按字典值排序
students = [
    {"name": "张三", "score": 92},
    {"name": "李四", "score": 85},
    {"name": "王五", "score": 98}
]
top = sorted(students, key=lambda s: s["score"], reverse=True)
</code></pre>
<div class="key-point"><strong>重点：</strong>函数的文档字符串（docstring）是函数的第一行字符串，用三引号括起来。使用 <code>help(函数名)</code> 或 <code>函数名.__doc__</code> 查看。Python函数是一等公民，可以赋值给变量、作为参数传递、作为返回值。</div>
            `
          },
          {
            id: 'python-basics-09',
            title: '流程控制与函数练习',
            type: 'practice',
            duration: 30,
            content: `
<p>通过以下练习巩固条件语句、循环和函数的知识。</p>
<pre><code class="language-python"># ========== 练习1：成绩分析系统 ==========
scores = [85, 92, 78, 95, 88, 72, 65, 90, 83, 76, 98, 60, 55, 91, 87]

# TODO 1: 定义函数 classify_score(score)，返回等级
# TODO 2: 使用列表推导式将所有分数转换为等级列表
# TODO 3: 统计各等级的人数
# TODO 4: 计算平均分、最高分、最低分、标准差

# ========== 练习2：数据筛选函数 ==========
data = [
    {"name": "张三", "age": 25, "salary": 15000, "dept": "技术"},
    {"name": "李四", "age": 30, "salary": 18000, "dept": "市场"},
    {"name": "王五", "age": 28, "salary": 12000, "dept": "技术"},
    {"name": "赵六", "age": 35, "salary": 22000, "dept": "管理"},
]

# TODO 5: 定义函数 filter_data(data, key, condition_func)
# TODO 6: 找出薪资超过15000的员工
# TODO 7: 找出技术部年龄小于30的员工

# ========== 练习3：斐波那契数列 ==========
# TODO 8: 使用for循环生成前20个斐波那契数
# TODO 9: 定义递归函数 fibonacci(n)
</code></pre>
            `
          },
          {
            id: 'python-basics-10',
            title: '第二章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对条件语句、循环、函数和lambda表达式的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第三章 ====================
      {
        id: 'python-ch3',
        title: '第三章：数据结构',
        lessons: [
          {
            id: 'python-basics-11',
            title: '列表与元组',
            type: 'theory',
            duration: 25,
            content: `
<p>列表（List）和元组（Tuple）是Python中最常用的序列数据结构。列表是可变的有序集合，元组是不可变的有序集合。</p>
<h2>列表的创建与操作</h2>
<pre><code class="language-python"># 创建列表
fruits = ["苹果", "香蕉", "橙子", "葡萄"]
numbers = [1, 2, 3, 4, 5]
nested = [[1, 2], [3, 4], [5, 6]]

# 列表基本操作
fruits.append("芒果")     # 末尾添加
fruits.insert(1, "西瓜")  # 指定位置插入
fruits.extend(["樱桃"])   # 扩展列表
removed = fruits.pop()     # 弹出末尾
fruits.remove("香蕉")     # 删除指定值

# 列表切片
numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
print(numbers[2:5])    # [2, 3, 4]
print(numbers[::2])    # [0, 2, 4, 6, 8]
print(numbers[::-1])   # [9, 8, 7, ...]

# 排序与统计
numbers = [3, 1, 4, 1, 5, 9, 2, 6]
numbers.sort()           # 原地排序
print(len(numbers))      # 8
print(sum(numbers))      # 31
print(numbers.count(1))  # 2
</code></pre>
<h2>元组</h2>
<pre><code class="language-python"># 创建元组
point = (3, 4)
single = (42,)     # 单元素元组必须加逗号

# 元组解包
x, y = point
a, b = 1, 2
a, b = b, a  # 交换变量

# 函数返回多个值
def stats(data):
    return min(data), max(data), sum(data) / len(data)

minimum, maximum, average = stats([10, 20, 30, 40, 50])

# 命名元组
from collections import namedtuple
Student = namedtuple('Student', ['name', 'age', 'score'])
s1 = Student('张三', 20, 92)
print(s1.name, s1.score)
</code></pre>
<h2>数据分析中的列表操作</h2>
<pre><code class="language-python"># 数据清洗示例
raw_data = ["  120", "N/A", "350", "  280", "null", "410"]

cleaned = [int(item.strip()) if item.strip() not in ("N/A", "null", "") else 0
           for item in raw_data]
print(f"清洗后: {cleaned}")
print(f"总和: {sum(cleaned)}")
</code></pre>
<div class="key-point"><strong>重点：</strong>列表是可变序列，支持增删改操作；元组是不可变序列，创建后不能修改。元组比列表更节省内存且访问更快。当数据不需要修改时，优先使用元组。</div>
            `
          },
          {
            id: 'python-basics-12',
            title: '字典与集合',
            type: 'theory',
            duration: 25,
            content: `
<p>字典（Dictionary）是键值对的集合，集合（Set）是无序且不重复的元素集合。在数据分析中，字典常用于映射关系，集合常用于去重和成员检测。</p>
<h2>字典的创建与操作</h2>
<pre><code class="language-python"># 创建字典
student = {
    "name": "张三",
    "age": 20,
    "score": 92,
    "courses": ["数学", "英语", "物理"]
}

# 访问值
print(student["name"])              # 张三
print(student.get("gpa", 0))       # 0（键不存在时返回默认值）

# 修改和添加
student["score"] = 95
student["email"] = "zhangsan@qq.com"

# 遍历字典
for key, value in student.items():
    print(f"{key}: {value}")

# 字典推导式
prices = {"苹果": 5, "香蕉": 3, "橙子": 4}
discounted = {k: round(v * 0.9, 1) for k, v in prices.items()}

# 条件字典推导式
scores = {"张三": 92, "李四": 58, "王五": 85}
passed = {k: v for k, v in scores.items() if v >= 60}
</code></pre>
<h2>集合</h2>
<pre><code class="language-python"># 创建集合
fruits = {"苹果", "香蕉", "橙子"}
numbers = set([1, 2, 3, 2, 1])  # 自动去重

# 集合运算
a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}
print(a | b)   # 并集
print(a & b)   # 交集
print(a - b)   # 差集
print(a ^ b)   # 对称差集

# 数据分析应用
data = [1, 2, 3, 2, 4, 5, 3, 6, 1, 7]
unique = list(set(data))  # 去重
</code></pre>
<h2>collections模块</h2>
<pre><code class="language-python">from collections import Counter, defaultdict

# Counter - 计数器
words = ["苹果", "香蕉", "苹果", "橙子", "香蕉", "苹果"]
counter = Counter(words)
print(counter)              # Counter({'苹果': 3, '香蕉': 2, '橙子': 1})
print(counter.most_common(2))  # [('苹果', 3), ('香蕉', 2)]

# defaultdict - 默认值字典
word_lengths = defaultdict(list)
for word in ["hello", "hi", "world", "python", "code"]:
    word_lengths[len(word)].append(word)
print(dict(word_lengths))
# {5: ['hello', 'world'], 2: ['hi'], 6: ['python'], 4: ['code']}
</code></pre>
<div class="key-point"><strong>重点：</strong>字典的键必须是不可变类型（str、int、tuple），值可以是任意类型。从Python 3.7开始，字典保持插入顺序。字典和集合的查找操作平均时间复杂度为O(1)。</div>
            `
          },
          {
            id: 'python-basics-13',
            title: '数据结构选择与推导式',
            type: 'theory',
            duration: 20,
            content: `
<p>Python提供了多种数据结构，每种都有其适用场景。选择合适的数据结构是编写高效代码的关键。</p>
<h2>数据结构对比</h2>
<pre><code class="language-python"># 列表: 有序、可变、允许重复 -> 有序数据集合
products = ["手机", "电脑", "平板"]

# 元组: 有序、不可变、允许重复 -> 固定数据、函数返回多值
config = ("localhost", 8080, "utf-8")

# 字典: 键值对、可变、键唯一 -> 映射关系、快速查找
user = {"id": 1, "name": "张三"}

# 集合: 无序、可变、元素唯一 -> 去重、成员检测、集合运算
tags = {"python", "data", "analysis"}
</code></pre>
<h2>高级推导式</h2>
<pre><code class="language-python"># 嵌套列表推导式（矩阵转置）
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
transposed = [[row[i] for row in matrix] for i in range(3)]

# 展平嵌套列表
nested = [[1, 2, 3], [4, 5], [6, 7, 8, 9]]
flat = [item for sublist in nested for item in sublist]

# 生成器表达式（节省内存）
squares_gen = (x**2 for x in range(1000000))
print(sum(squares_gen))  # 按需计算，不占大量内存
</code></pre>
<div class="key-point"><strong>重点：</strong>选择数据结构的决策：需要有序且可修改？用列表。需要有序但不可修改？用元组。需要键值映射？用字典。需要去重或集合运算？用集合。需要快速成员检测？用集合或字典。</div>
            `
          },
          {
            id: 'python-basics-14',
            title: '数据结构综合练习',
            type: 'practice',
            duration: 30,
            content: `
<p>通过以下练习巩固列表、元组、字典和集合的综合应用能力。</p>
<pre><code class="language-python"># ========== 练习1：学生成绩管理 ==========
students = [
    {"name": "张三", "scores": {"数学": 92, "英语": 85, "物理": 88}},
    {"name": "李四", "scores": {"数学": 78, "英语": 92, "物理": 65}},
    {"name": "王五", "scores": {"数学": 95, "英语": 88, "物理": 92}},
]

# TODO 1: 计算每个学生的平均分
# TODO 2: 按平均分排序
# TODO 3: 找出每科的最高分学生

# ========== 练习2：文本分析 ==========
text = "Python is great and Python is easy to learn Python has many libraries"

# TODO 4: 统计每个单词出现的频率
# TODO 5: 找出出现频率最高的前3个单词

# ========== 练习3：数据透视 ==========
sales = [
    {"region": "华东", "product": "A", "amount": 15000},
    {"region": "华东", "product": "B", "amount": 12000},
    {"region": "华南", "product": "A", "amount": 18000},
    {"region": "华南", "product": "B", "amount": 9000},
]

# TODO 6: 按区域汇总销售额
# TODO 7: 创建区域-产品交叉汇总字典
</code></pre>
            `
          },
          {
            id: 'python-basics-15',
            title: '第三章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对Python数据结构的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第四章 ====================
      {
        id: 'python-ch4',
        title: '第四章：文件操作与异常处理',
        lessons: [
          {
            id: 'python-basics-16',
            title: '文件读写操作',
            type: 'theory',
            duration: 25,
            content: `
<p>文件操作是数据分析的基础技能。Python提供了简洁优雅的文件操作接口，支持文本文件和二进制文件的读写。</p>
<h2>打开与关闭文件</h2>
<pre><code class="language-python"># with语句（推荐，自动关闭文件）
with open("data.txt", "r", encoding="utf-8") as f:
    content = f.read()    # 读取全部
    # f.readline()        # 读取一行
    # f.readlines()       # 读取所有行到列表

# 直接遍历（推荐，内存友好）
with open("data.txt", "r", encoding="utf-8") as f:
    for line in f:
        print(line.strip())
</code></pre>
<h2>CSV文件处理</h2>
<pre><code class="language-python">import csv

# 读取CSV
with open("sales.csv", "r", encoding="utf-8") as f:
    reader = csv.DictReader(f)
    for row in reader:
        print(f"商品: {row['product']}, 销量: {row['quantity']}")

# 写入CSV
data = [["姓名", "年龄", "城市"], ["张三", "25", "北京"]]
with open("people.csv", "w", encoding="utf-8", newline="") as f:
    writer = csv.writer(f)
    writer.writerows(data)
</code></pre>
<h2>JSON文件处理</h2>
<pre><code class="language-python">import json

data = {
    "name": "数据分析报告",
    "summary": {"total_sales": 150000, "orders": 342}
}

# 写入JSON
with open("report.json", "w", encoding="utf-8") as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

# 读取JSON
with open("report.json", "r", encoding="utf-8") as f:
    loaded = json.load(f)
</code></pre>
<div class="key-point"><strong>重点：</strong>始终使用 <code>with</code> 语句操作文件，确保文件自动关闭。处理CSV时设置 <code>newline=""</code> 避免空行。读写时指定 <code>encoding="utf-8"</code>。</div>
            `
          },
          {
            id: 'python-basics-17',
            title: '异常处理与上下文管理器',
            type: 'theory',
            duration: 25,
            content: `
<p>异常处理是编写健壮程序的关键技术。在数据分析中，数据文件可能损坏、格式可能不一致，良好的异常处理能让程序优雅地应对这些意外情况。</p>
<h2>try/except/else/finally</h2>
<pre><code class="language-python"># 基本异常捕获
try:
    result = int("123")
except ValueError as e:
    print(f"转换失败: {e}")
else:
    print(f"转换成功: {result}")
finally:
    print("无论如何都执行")

# 捕获多种异常
def safe_divide(a, b):
    try:
        return a / b
    except ZeroDivisionError:
        print("错误：除数不能为零")
        return None
    except TypeError:
        print("错误：请输入数字")
        return None

# 安全的数据转换
def safe_convert(value, target_type="float"):
    try:
        if target_type == "int":
            return int(float(value))
        elif target_type == "float":
            return float(value)
    except (ValueError, TypeError):
        return None

raw_values = ["120.5", "N/A", "350", "null", "abc"]
converted = [safe_convert(v) for v in raw_values]
print(converted)  # [120.5, None, 350.0, None, None]
</code></pre>
<h2>上下文管理器</h2>
<pre><code class="language-python">from contextlib import contextmanager
import time

@contextmanager
def timer(name="操作"):
    """计时器上下文管理器"""
    start = time.time()
    yield
    print(f"{name}耗时: {time.time() - start:.4f}秒")

with timer("数据处理"):
    total = sum(range(10000000))
</code></pre>
<div class="key-point"><strong>重点：</strong>只捕获预期的异常，不要用裸except。在except中提供有用的错误信息。使用finally释放资源。不要用异常来控制正常流程。</div>
            `
          },
          {
            id: 'python-basics-18',
            title: '文件操作与异常处理练习',
            type: 'practice',
            duration: 30,
            content: `
<p>通过以下练习巩固文件操作和异常处理的知识。</p>
<pre><code class="language-python"># ========== 练习1：日志分析 ==========
log_data = """2024-03-15 08:30:12 INFO 用户登录 user_id=1001
2024-03-15 08:31:45 ERROR 数据库连接失败
2024-03-15 08:32:10 INFO 用户登录 user_id=1002
2024-03-15 08:33:22 WARNING 内存使用率 85%
2024-03-15 08:34:01 ERROR API请求超时"""

# TODO 1: 将log_data写入文件
# TODO 2: 读取并统计各级别日志数量
# TODO 3: 提取所有ERROR日志

# ========== 练习2：数据清洗管道 ==========
raw_data = [
    {"name": "张三", "age": "25", "salary": "15000"},
    {"name": "李四", "age": "N/A", "salary": "18000"},
    {"name": "王五", "age": "28", "salary": "invalid"},
]

# TODO 4: 定义 safe_convert 函数
# TODO 5: 清洗所有数据
# TODO 6: 将有效数据保存为JSON
</code></pre>
            `
          },
          {
            id: 'python-basics-19',
            title: '第四章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对文件操作和异常处理的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第五章 ====================
      {
        id: 'python-ch5',
        title: '第五章：面向对象编程',
        lessons: [
          {
            id: 'python-basics-20',
            title: '类与对象基础',
            type: 'theory',
            duration: 25,
            content: `
<p>面向对象编程（OOP）将数据和操作数据的方法组织在一起形成"类"。Python支持多范式编程，OOP是其核心特性之一。</p>
<h2>类的定义与实例化</h2>
<pre><code class="language-python">class Student:
    """学生类"""
    school = "数据科学大学"  # 类属性

    def __init__(self, name, age, score):
        self.name = name      # 实例属性
        self.age = age
        self.score = score

    def get_grade(self):
        if self.score >= 90: return "优秀"
        elif self.score >= 80: return "良好"
        elif self.score >= 70: return "中等"
        elif self.score >= 60: return "及格"
        else: return "不及格"

    def info(self):
        return f"{self.name}, {self.age}岁, {self.score}分, {self.get_grade()}"

s1 = Student("张三", 20, 92)
print(s1.info())  # 张三, 20岁, 92分, 优秀
</code></pre>
<h2>属性装饰器</h2>
<pre><code class="language-python">class BankAccount:
    def __init__(self, owner, balance=0):
        self.owner = owner
        self._balance = balance  # 单下划线：约定私有

    @property
    def balance(self):
        return self._balance

    @balance.setter
    def balance(self, amount):
        if amount < 0:
            raise ValueError("余额不能为负数")
        self._balance = amount

    def deposit(self, amount):
        if amount <= 0:
            raise ValueError("存款金额必须大于0")
        self._balance += amount

account = BankAccount("张三", 1000)
account.deposit(500)
print(account.balance)  # 1500
</code></pre>
<h2>类方法与静态方法</h2>
<pre><code class="language-python">class Circle:
    def __init__(self, radius):
        self.radius = radius

    @classmethod
    def from_diameter(cls, diameter):
        return cls(diameter / 2)

    @staticmethod
    def is_valid_radius(radius):
        return radius > 0

c = Circle.from_diameter(10)
print(Circle.is_valid_radius(5))  # True
</code></pre>
<div class="key-point"><strong>重点：</strong>实例方法第一个参数是self，类方法第一个参数是cls，静态方法不需要特殊参数。<code>@property</code> 可以将方法变为属性访问方式。</div>
            `
          },
          {
            id: 'python-basics-21',
            title: '继承与多态',
            type: 'theory',
            duration: 25,
            content: `
<p>继承允许创建新类来继承已有类的属性和方法，并可以扩展或修改它们。多态允许不同类的对象对同一消息做出不同的响应。</p>
<h2>基本继承</h2>
<pre><code class="language-python">class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_info(self):
        return f"{self.name}, 薪资: {self.salary:,} 元"

    def work(self):
        return f"{self.name}正在工作"

class Developer(Employee):
    def __init__(self, name, salary, language):
        super().__init__(name, salary)
        self.language = language

    def work(self):  # 方法重写
        return f"{self.name}正在使用{self.language}编程"

class Manager(Employee):
    def __init__(self, name, salary, team_size):
        super().__init__(name, salary)
        self.team_size = team_size

    def work(self):
        return f"{self.name}正在管理{self.team_size}人的团队"

# 多态
employees = [Developer("张三", 25000, "Python"), Manager("李四", 35000, 8)]
for emp in employees:
    print(emp.work())  # 不同对象，不同行为
</code></pre>
<h2>魔术方法</h2>
<pre><code class="language-python">class Vector:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __repr__(self):
        return f"Vector({self.x}, {self.y})"

    def __add__(self, other):
        return Vector(self.x + other.x, self.y + other.y)

    def __abs__(self):
        return (self.x ** 2 + self.y ** 2) ** 0.5

v1 = Vector(3, 4)
v2 = Vector(1, 2)
print(v1 + v2)   # Vector(4, 6)
print(abs(v1))   # 5.0
</code></pre>
<div class="key-point"><strong>重点：</strong>使用 <code>super()</code> 调用父类方法。方法重写允许子类提供父类方法的新实现。MRO决定了多重继承时方法的查找顺序。</div>
            `
          },
          {
            id: 'python-basics-22',
            title: '装饰器基础',
            type: 'theory',
            duration: 20,
            content: `
<p>装饰器（Decorator）允许在不修改原函数代码的情况下扩展函数的功能。装饰器本质上是一个接受函数作为参数并返回新函数的高阶函数。</p>
<h2>基本装饰器</h2>
<pre><code class="language-python">def timer(func):
    """计时装饰器"""
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} 耗时: {time.time() - start:.4f}秒")
        return result
    return wrapper

@timer
def calculate_sum(n):
    return sum(range(n + 1))

calculate_sum(1000000)
</code></pre>
<h2>常用装饰器模式</h2>
<pre><code class="language-python"># 缓存装饰器
def memoize(func):
    cache = {}
    def wrapper(*args):
        if args not in cache:
            cache[args] = func(*args)
        return cache[args]
    return wrapper

@memoize
def fibonacci(n):
    if n <= 1: return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(50))  # 极快

# 使用functools完善装饰器
from functools import wraps

def my_decorator(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print("Before")
        result = func(*args, **kwargs)
        print("After")
        return result
    return wrapper
</code></pre>
<div class="key-point"><strong>重点：</strong>装饰器的本质是高阶函数。<code>@decorator</code> 语法糖等价于 <code>func = decorator(func)</code>。使用 <code>@wraps(func)</code> 保留被装饰函数的元信息。</div>
            `
          },
          {
            id: 'python-basics-23',
            title: '面向对象编程练习',
            type: 'practice',
            duration: 30,
            content: `
<p>通过以下练习巩固面向对象编程的知识。</p>
<pre><code class="language-python"># ========== 练习1：数据分析框架 ==========

# TODO 1: 创建DataLoader类
# - load_csv(filepath): 读取CSV返回字典列表
# - get_columns(data): 返回列名
# - get_row_count(data): 返回行数

# TODO 2: 创建DataCleaner类
# - remove_nulls(data, column): 移除空值行
# - fill_nulls(data, column, fill_value): 填充空值
# - remove_duplicates(data, column): 去重

# TODO 3: 创建DataAnalyzer类
# - summary(data, column): 统计摘要
# - filter(data, column, condition): 条件筛选
# - group_by(data, group_col, value_col): 分组统计

# ========== 练习2：装饰器实战 ==========
# TODO 4: 实现retry装饰器（自动重试）
# TODO 5: 实现validate_range装饰器
</code></pre>
            `
          },
          {
            id: 'python-basics-24',
            title: '第五章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对面向对象编程的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第六章 ====================
      {
        id: 'python-ch6',
        title: '第六章：NumPy科学计算',
        lessons: [
          {
            id: 'python-basics-25',
            title: 'NumPy数组创建与操作',
            type: 'theory',
            duration: 25,
            content: `
<p>NumPy（Numerical Python）是Python科学计算的基础库，提供了高性能的多维数组对象和丰富的数学函数。</p>
<h2>创建数组</h2>
<pre><code class="language-python">import numpy as np

# 从列表创建
arr1 = np.array([1, 2, 3, 4, 5])
print(arr1.dtype)   # int64
print(arr1.shape)   # (5,)

# 常用创建函数
print(np.zeros(5))              # [0. 0. 0. 0. 0.]
print(np.ones((3, 4)))          # 3x4全1矩阵
print(np.arange(0, 10, 2))     # [0 2 4 6 8]
print(np.linspace(0, 1, 5))    # [0. 0.25 0.5 0.75 1.]
print(np.random.rand(3, 3))     # 随机矩阵
print(np.eye(3))                # 单位矩阵
</code></pre>
<h2>数组运算</h2>
<pre><code class="language-python">a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])

print(a + b)   # [ 6  8 10 12] 元素级加法
print(a * b)   # [ 5 12 21 32] 元素级乘法
print(a ** 2)  # [ 1  4  9 16] 幂运算

# 通用函数
print(np.sqrt(a))     # [1. 1.414 1.732 2.]
print(np.exp(a))       # 指数函数
print(np.log(a))       # 对数函数

# 统计函数
data = np.array([23, 45, 12, 67, 34, 89, 56, 78])
print(np.mean(data))    # 均值
print(np.std(data))     # 标准差
print(np.percentile(data, 75))  # 75百分位数
</code></pre>
<div class="key-point"><strong>重点：</strong>NumPy数组中所有元素必须是相同类型。数组运算默认是元素级的。NumPy支持广播机制，允许不同形状的数组进行运算。应尽量使用向量化操作而非循环。</div>
            `
          },
          {
            id: 'python-basics-26',
            title: '数组索引、切片与线性代数',
            type: 'theory',
            duration: 25,
            content: `
<p>NumPy提供了强大的索引和切片机制，支持布尔索引、花式索引等高级操作。同时，linalg模块提供了矩阵运算支持。</p>
<h2>索引与切片</h2>
<pre><code class="language-python">import numpy as np

# 一维数组
arr = np.array([10, 20, 30, 40, 50])
print(arr[0])      # 10
print(arr[2:5])    # [30 40 50]
print(arr[::-1])   # [50 40 30 20 10]

# 二维数组
arr2d = np.array([[1, 2, 3, 4],
                  [5, 6, 7, 8],
                  [9, 10, 11, 12]])
print(arr2d[0, :])     # [1 2 3 4]
print(arr2d[:, 2])     # [3 7 11]
print(arr2d[0:2, 1:3]) # [[2 3] [6 7]]
</code></pre>
<h2>布尔索引</h2>
<pre><code class="language-python">data = np.array([23, 45, 12, 67, 34, 89, 56, 78])
print(data[data > 50])  # [67 89 56 78]
print(data[(data > 20) & (data < 60)])  # [23 45 34 56]

# 替换满足条件的值
scores = np.array([85, 92, 78, 55, 90])
scores[scores < 60] = 60  # 不及格设为60
</code></pre>
<h2>线性代数</h2>
<pre><code class="language-python">A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

print(A @ B)              # 矩阵乘法
print(A.T)                # 转置
print(np.linalg.inv(A))   # 逆矩阵
print(np.linalg.det(A))   # 行列式

# 解线性方程组
A = np.array([[2, 1], [3, 4]])
b = np.array([5, 10])
x = np.linalg.solve(A, b)
print(f"解: x={x[0]:.2f}, y={x[1]:.2f}")

# SVD分解
U, S, Vt = np.linalg.svd(A)
</code></pre>
<div class="key-point"><strong>重点：</strong>布尔索引使用 <code>&</code>、<code>|</code>、<code>~</code> 代替 and、or、not。NumPy切片返回视图（修改影响原数组），布尔索引返回副本。矩阵乘法使用 <code>@</code>。</div>
            `
          },
          {
            id: 'python-basics-27',
            title: 'NumPy随机数与数据分析应用',
            type: 'theory',
            duration: 20,
            content: `
<p>NumPy的random模块提供了丰富的随机数生成功能，是数据分析和机器学习模拟的基础。</p>
<h2>随机数生成</h2>
<pre><code class="language-python">import numpy as np
np.random.seed(42)  # 设置随机种子

print(np.random.rand(3, 3))     # 均匀分布 [0, 1)
print(np.random.randn(3, 3))   # 标准正态分布
print(np.random.randint(1, 100, size=10))  # 随机整数

# 指定分布
data = np.random.normal(loc=100, scale=15, size=10000)
print(f"均值: {np.mean(data):.2f}")  # 约100
print(f"标准差: {np.std(data):.2f}")  # 约15
</code></pre>
<h2>数据分析应用</h2>
<pre><code class="language-python"># 模拟销售数据
np.random.seed(42)
base_sales = 100000
growth = np.linspace(0, 0.3, 12)
seasonal = np.sin(np.linspace(0, 2 * np.pi, 12)) * 10000
noise = np.random.normal(0, 5000, 12)
sales = base_sales * (1 + growth) + seasonal + noise

# 数据标准化（Z-score）
data = np.array([85, 92, 78, 95, 88, 72, 65, 90])
z_scores = (data - np.mean(data)) / np.std(data)

# 相关系数矩阵
height = np.random.normal(170, 10, 100)
weight = height * 0.6 + np.random.normal(0, 5, 100)
corr = np.corrcoef(height, weight)
print(f"相关系数: {corr[0, 1]:.3f}")
</code></pre>
<div class="key-point"><strong>重点：</strong>设置随机种子确保结果可复现，这在实验对比和模型调试中至关重要。<code>np.corrcoef()</code> 计算Pearson相关系数矩阵。</div>
            `
          },
          {
            id: 'python-basics-28',
            title: 'NumPy科学计算练习',
            type: 'practice',
            duration: 30,
            content: `
<p>通过以下练习巩固NumPy数组操作和科学计算的知识。</p>
<pre><code class="language-python">import numpy as np

# ========== 练习1：学生成绩分析 ==========
np.random.seed(42)
scores = np.random.randint(40, 100, size=(100, 5))

# TODO 1: 计算每个学生的总分和平均分
# TODO 2: 计算每科的统计信息（均值、标准差等）
# TODO 3: 找出总分最高的前5名学生
# TODO 4: 找出数学成绩不及格的学生

# ========== 练习2：数据预处理 ==========
np.random.seed(42)
data = np.random.randn(1000, 5)
mask = np.random.random(data.shape) < 0.05
data[mask] = np.nan

# TODO 5: 统计每列缺失值数量
# TODO 6: 用均值填充缺失值
# TODO 7: Z-score标准化
# TODO 8: 找出异常值（|z| > 3）
</code></pre>
            `
          },
          {
            id: 'python-basics-29',
            title: '第六章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对NumPy的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第七章 ====================
      {
        id: 'python-ch7',
        title: '第七章：综合项目实战',
        lessons: [
          {
            id: 'python-basics-30',
            title: '数据清洗综合项目',
            type: 'practice',
            duration: 40,
            content: `
<p>综合运用前六章所学知识，完成一个完整的数据清洗项目。</p>
<pre><code class="language-python">import numpy as np
import json

np.random.seed(42)
n_orders = 200
products = ["手机", "电脑", "耳机", "键盘", "显示器"]
regions = ["华东", "华南", "华北", "华中", "西南"]

orders = []
for i in range(n_orders):
    orders.append({
        "order_id": f"ORD-{10001 + i}",
        "product": np.random.choice(products),
        "quantity": int(np.random.choice([1,2,3,4,5])),
        "price": round(np.random.uniform(50, 5000), 2),
        "region": np.random.choice(regions),
        "date": f"2024-{np.random.randint(1,13):02d}-{np.random.randint(1,29):02d}"
    })

# TODO 1: 注入数据质量问题（无效值、重复等）
# TODO 2: 生成数据质量报告
# TODO 3: 清洗数据（处理无效值、去重）
# TODO 4: 数据增强（添加计算列）
# TODO 5: 统计分析（区域、商品、月度）
# TODO 6: 保存结果为JSON
</code></pre>
            `
          },
          {
            id: 'python-basics-31',
            title: '自动化报告生成项目',
            type: 'practice',
            duration: 40,
            content: `
<p>创建一个自动化报告生成器，展示完整的Python数据分析工作流。</p>
<pre><code class="language-python"># TODO 1: 创建DataGenerator类 - 生成模拟销售数据
# TODO 2: 创建ReportAnalyzer类 - 数据分析
#   - monthly_summary() 月度汇总
#   - product_analysis() 商品分析
#   - regional_analysis() 区域分析
# TODO 3: 创建ReportGenerator类 - 生成文本报告
#   - generate_text_report() 格式化输出
#   - save_to_file(filename) 保存文件
# TODO 4: 创建main()函数串联整个流程
# TODO 5: 添加异常处理和计时装饰器
</code></pre>
            `
          },
          {
            id: 'python-basics-32',
            title: '课程总结与进阶方向',
            type: 'theory',
            duration: 15,
            content: `
<p>恭喜你完成了Python数据分析基础课程！本课时对整个课程进行回顾总结，并指明后续学习方向。</p>
<h2>课程知识体系回顾</h2>
<ul>
  <li><strong>第一章</strong>：Python环境搭建与基础语法</li>
  <li><strong>第二章</strong>：流程控制与函数</li>
  <li><strong>第三章</strong>：数据结构（列表、元组、字典、集合）</li>
  <li><strong>第四章</strong>：文件操作与异常处理</li>
  <li><strong>第五章</strong>：面向对象编程（类、继承、装饰器）</li>
  <li><strong>第六章</strong>：NumPy科学计算</li>
  <li><strong>第七章</strong>：综合项目实战</li>
</ul>
<h2>进阶学习方向</h2>
<ul>
  <li><strong>Pandas数据分析</strong>：DataFrame操作，数据分析核心工具</li>
  <li><strong>数据可视化</strong>：Matplotlib、Seaborn</li>
  <li><strong>统计分析</strong>：假设检验、回归分析</li>
  <li><strong>机器学习</strong>：Scikit-learn</li>
</ul>
<div class="key-point"><strong>重点：</strong>编程能力的提升需要大量实践。建议每天坚持写代码，参与Kaggle竞赛，阅读优秀项目源代码。</div>
<div class="tip"><strong>提示：</strong>推荐学习资源：《Python数据科学手册》、《利用Python进行数据分析》、Kaggle竞赛平台。下一步建议学习Pandas课程。</div>
            `
          },
          {
            id: 'python-basics-33',
            title: '第七章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对Python数据分析基础全课程的掌握程度。</p>`
          }
        ]
      }
    ]
  },

  // ============================================================
  // 课程2：Pandas数据分析
  // ============================================================
  {
    id: 'pandas-fundamentals',
    title: 'Pandas数据分析',
    icon: '🐼',
    difficulty: 'beginner',
    description: '深入学习Pandas库，掌握高效的数据处理与分析技能。本课程参考《利用Python进行数据分析》（Wes McKinney著），涵盖Series、DataFrame、数据清洗、聚合分组、合并连接、时间序列和数据可视化等核心内容。',
    category: '数据处理',
    chapters: [
      // ==================== 第一章 ====================
      {
        id: 'pandas-ch1',
        title: '第一章：Pandas入门',
        lessons: [
          {
            id: 'pandas-fundamentals-01',
            title: 'Pandas简介与安装',
            type: 'theory',
            duration: 15,
            content: `
<p>Pandas是Python中最流行的数据处理和分析库，由Wes McKinney于2008年开发。Pandas的名字来源于"Panel Data"（面板数据）的缩写。它建立在NumPy之上，提供了高性能、易用的数据结构和数据分析工具。</p>
<h2>Pandas的核心优势</h2>
<ul>
  <li><strong>高效的数据结构</strong>：Series（一维）和DataFrame（二维）专为数据处理设计</li>
  <li><strong>灵活的数据操作</strong>：筛选、排序、分组、聚合、合并等</li>
  <li><strong>多种数据格式支持</strong>：CSV、Excel、JSON、SQL、HTML等</li>
  <li><strong>处理缺失数据</strong>：内置缺失值处理机制</li>
  <li><strong>时间序列支持</strong>：强大的日期时间处理能力</li>
</ul>
<h2>安装与导入</h2>
<pre><code class="language-python"># pip install pandas
import pandas as pd
import numpy as np

print(pd.__version__)

# 常用设置
pd.set_option('display.max_columns', None)
pd.set_option('display.float_format', '{:.2f}'.format)
</code></pre>
<div class="key-point"><strong>重点：</strong>Pandas是Python数据分析生态系统的核心。几乎所有数据分析工作流都从Pandas开始：读取数据 -> 清洗 -> 转换 -> 分析 -> 输出。</div>
            `
          },
          {
            id: 'pandas-fundamentals-02',
            title: 'Series数据结构',
            type: 'theory',
            duration: 20,
            content: `
<p>Series是Pandas中的一维数据结构，类似于NumPy数组但带有标签索引。它是DataFrame的基础构建块。</p>
<h2>创建Series</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

# 从列表创建
s1 = pd.Series([120, 350, 280, 410, 190])

# 从字典创建（键作为索引）
s2 = pd.Series({
    "笔记本电脑": 5990,
    "无线耳机": 299,
    "机械键盘": 599
})

# 指定索引和名称
s3 = pd.Series([150000, 180000, 135000],
               name="月度销售额",
               index=["一月", "二月", "三月"])
</code></pre>
<h2>索引与切片</h2>
<pre><code class="language-python">s = pd.Series([85, 92, 78, 95, 88],
              index=["语文", "数学", "英语", "物理", "化学"])

# .loc 标签索引
print(s.loc["语文"])          # 85
print(s.loc["数学":"物理"])   # 数学到物理

# .iloc 位置索引
print(s.iloc[0])       # 85
print(s.iloc[1:3])     # 数学 92, 英语 78

# 布尔索引
print(s[s > 85])  # 数学 92, 物理 95, 化学 88
</code></pre>
<h2>Series方法</h2>
<pre><code class="language-python">s = pd.Series([120, 350, 280, 410, 190])

# 统计方法
print(s.sum())       # 1350
print(s.mean())      # 270
print(s.median())    # 280
print(s.std())       # 标准差
print(s.describe())  # 描述性统计

# 排序
print(s.sort_values(ascending=False))  # 按值降序

# 去重与计数
s_dup = pd.Series([1, 2, 2, 3, 3, 3])
print(s_dup.unique())       # [1, 2, 3]
print(s_dup.value_counts()) # 各值计数

# 字符串方法
s = pd.Series(["hello", "world", "python"])
print(s.str.upper())
print(s.str.len())
</code></pre>
<h2>Series运算（自动对齐）</h2>
<pre><code class="language-python">s1 = pd.Series({"苹果": 5, "香蕉": 3, "橙子": 4})
s2 = pd.Series({"苹果": 2, "香蕉": 1, "芒果": 6})

print(s1 + s2)  # 未匹配的为NaN
print(s1.add(s2, fill_value=0))  # 指定填充值
</code></pre>
<div class="key-point"><strong>重点：</strong>Series运算时会自动按索引对齐，未匹配的位置产生NaN。使用 <code>.add()</code> 等方法的 <code>fill_value</code> 参数可以指定默认填充值。建议明确使用 <code>.loc[]</code> 或 <code>.iloc[]</code> 避免索引歧义。</div>
            `
          },
          {
            id: 'pandas-fundamentals-03',
            title: 'DataFrame基础操作',
            type: 'theory',
            duration: 25,
            content: `
<p>DataFrame是Pandas中最核心的数据结构，是一个二维的、带标签的表格型数据结构。每列可以是不同的数据类型。</p>
<h2>创建DataFrame</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

# 从字典创建（最常用）
df = pd.DataFrame({
    "name": ["张三", "李四", "王五", "赵六"],
    "age": [25, 30, 28, 35],
    "city": ["北京", "上海", "广州", "深圳"],
    "salary": [15000, 18000, 12000, 22000]
})

# 从字典列表创建
records = [
    {"name": "张三", "age": 25},
    {"name": "李四", "age": 30}
]
df = pd.DataFrame(records)

# 从NumPy数组创建
df = pd.DataFrame(np.random.randn(5, 3), columns=["A", "B", "C"])
</code></pre>
<h2>查看数据</h2>
<pre><code class="language-python">print(df.head(3))      # 前3行
print(df.tail(2))       # 后2行
print(df.sample(3))     # 随机3行
print(df.shape)         # (行数, 列数)
print(df.dtypes)        # 各列类型
print(df.info())        # 数据概览
print(df.describe())    # 统计摘要
</code></pre>
<h2>列操作</h2>
<pre><code class="language-python"># 选择列
print(df["name"])          # 单列（Series）
print(df[["name", "age"]]) # 多列（DataFrame）

# 添加列
df["bonus"] = df["salary"] * 0.1
df["department"] = "技术部"

# 删除列
df.drop("bonus", axis=1, inplace=True)
df.drop(columns=["department"])

# 重命名列
df.rename(columns={"name": "姓名", "age": "年龄"})
</code></pre>
<h2>行操作</h2>
<pre><code class="language-python"># 选择行
print(df.loc[0])           # 按标签
print(df.loc[[0, 2]])      # 多行
print(df.iloc[0:3])        # 按位置

# 修改单元格
df.loc[0, "salary"] = 16000
</code></pre>
<div class="key-point"><strong>重点：</strong><code>df["列名"]</code> 返回Series，<code>df[["列名1", "列名2"]]</code> 返回DataFrame。<code>loc[]</code> 使用标签，<code>iloc[]</code> 使用位置。避免链式索引，使用 <code>df.loc[row, col]</code>。</div>
<div class="warning"><strong>注意：</strong>链式索引（如 <code>df["col"]["row"]</code>）可能触发SettingWithCopyWarning。应使用 <code>df.loc[row, col]</code> 进行精确操作。</div>
            `
          },
          {
            id: 'pandas-fundamentals-04',
            title: '数据读取与写入',
            type: 'theory',
            duration: 20,
            content: `
<p>Pandas支持读取和写入多种数据格式，这是数据分析工作流的第一步和最后一步。</p>
<h2>读取CSV文件</h2>
<pre><code class="language-python">import pandas as pd

# 基本读取
df = pd.read_csv("data.csv")

# 常用参数
df = pd.read_csv(
    "data.csv",
    encoding="utf-8",
    header=0,                # 表头行号
    index_col=0,             # 索引列
    usecols=["name", "age"], # 只读取指定列
    nrows=100,               # 只读前100行
    na_values=["N/A", "null"], # 缺失值标记
    parse_dates=["date"],    # 解析日期
    dtype={"age": int},      # 指定类型
)
</code></pre>
<h2>读取其他格式</h2>
<pre><code class="language-python"># Excel
df = pd.read_excel("data.xlsx", sheet_name="Sheet1")

# JSON
df = pd.read_json("data.json")

# SQL
import sqlite3
conn = sqlite3.connect("database.db")
df = pd.read_sql("SELECT * FROM users", conn)

# HTML表格
dfs = pd.read_html("https://example.com/table.html")

# 剪贴板
df = pd.read_clipboard()
</code></pre>
<h2>写入数据</h2>
<pre><code class="language-python"># 写入CSV
df.to_csv("output.csv", index=False, encoding="utf-8")

# 写入Excel
df.to_excel("output.xlsx", sheet_name="数据", index=False)

# 写入JSON
df.to_json("output.json", force_ascii=False, indent=2)

# 写入SQL
df.to_sql("table_name", conn, if_exists="replace", index=False)
</code></pre>
<div class="key-point"><strong>重点：</strong>读取大文件时使用 <code>nrows</code> 先预览数据，<code>usecols</code> 只读需要的列，<code>dtype</code> 指定类型减少内存。中文文件注意编码（utf-8或gbk）。</div>
            `
          },
          {
            id: 'pandas-fundamentals-05',
            title: 'Pandas入门练习',
            type: 'practice',
            duration: 25,
            content: `
<p>通过以下练习巩固Pandas基础操作。</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

# ========== 练习1：创建DataFrame ==========
# TODO 1: 从字典创建一个包含10条员工记录的DataFrame
# 字段: name, age, department, salary, hire_date

# TODO 2: 查看数据基本信息（shape, dtypes, describe）

# TODO 3: 添加计算列: annual_salary = salary * 12

# TODO 4: 按salary降序排序

# ========== 练习2：数据读写 ==========
# TODO 5: 将DataFrame保存为CSV文件
# TODO 6: 从CSV文件重新读取
# TODO 7: 验证读取的数据与原始数据一致

# ========== 练习3：Series操作 ==========
# TODO 8: 从salary列创建Series
# TODO 9: 计算薪资的Z-score
# TODO 10: 找出薪资异常值（|z| > 2）
</code></pre>
            `
          },
          {
            id: 'pandas-fundamentals-06',
            title: '第一章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对Pandas入门知识的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第二章 ====================
      {
        id: 'pandas-ch2',
        title: '第二章：数据选择与过滤',
        lessons: [
          {
            id: 'pandas-fundamentals-07',
            title: '列选择与行过滤',
            type: 'theory',
            duration: 25,
            content: `
<p>数据选择与过滤是数据分析中最常用的操作。Pandas提供了多种灵活的方式来选择和过滤数据，从简单的列选择到复杂的多条件组合筛选。</p>
<h2>列选择</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name": ["张三", "李四", "王五", "赵六", "钱七"],
    "age": [25, 30, 28, 35, 22],
    "city": ["北京", "上海", "广州", "深圳", "北京"],
    "salary": [15000, 18000, 12000, 22000, 8000],
    "department": ["技术", "市场", "技术", "管理", "技术"]
})

# 单列选择
names = df["name"]  # 返回Series

# 多列选择
subset = df[["name", "salary"]]  # 返回DataFrame

# 按数据类型选择列
numeric_cols = df.select_dtypes(include=[np.number])
string_cols = df.select_dtypes(include=["object"])

# 过滤列名
cols_starting_with_s = df.filter(regex="^s")  # 以s开头的列
</code></pre>
<h2>行过滤</h2>
<pre><code class="language-python"># 单条件过滤
tech_staff = df[df["department"] == "技术"]

# 多条件过滤（使用 & | ~）
high_salary_tech = df[
    (df["department"] == "技术") & 
    (df["salary"] > 10000)
]

# 使用 isin 过滤
beijing_or_shanghai = df[df["city"].isin(["北京", "上海"])]

# 使用 between 过滤
age_25_to_30 = df[df["age"].between(25, 30)]

# 字符串过滤
name_starts_with_zhang = df[df["name"].str.startswith("张")]
</code></pre>
<h2>loc与iloc详解</h2>
<pre><code class="language-python"># loc - 基于标签
print(df.loc[0, "name"])           # 单个值
print(df.loc[0:2, "name":"salary"]) # 切片（包含两端）
print(df.loc[df["age"] > 25, "name"])  # 布尔索引

# iloc - 基于位置
print(df.iloc[0, 0])       # 第一行第一列
print(df.iloc[0:3, 1:4])   # 前3行，第2-4列
print(df.iloc[:, [0, 3]])  # 所有行，第1和4列

# 组合使用
print(df.loc[df.index[:3], ["name", "salary"]])  # 前3行的指定列
</code></pre>
<div class="key-point"><strong>重点：</strong>多条件组合时每个条件必须用括号括起来：<code>(条件1) & (条件2)</code>。<code>loc</code> 切片包含两端，<code>iloc</code> 切片不包含末端。<code>isin()</code> 等价于SQL的IN操作。</div>
<div class="warning"><strong>注意：</strong>过滤操作返回的是视图还是副本取决于Pandas版本和操作方式。修改过滤结果时，建议使用 <code>.copy()</code> 创建显式副本，避免SettingWithCopyWarning。</div>
            `
          },
          {
            id: 'pandas-fundamentals-08',
            title: '条件筛选与多条件组合',
            type: 'theory',
            duration: 20,
            content: `
<p>在实际数据分析中，我们经常需要组合多个条件来筛选数据。本课时深入讲解各种筛选技巧。</p>
<h2>高级条件筛选</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name": ["张三", "李四", "王五", "赵六", "钱七", "孙八"],
    "age": [25, 30, 28, 35, 22, 40],
    "salary": [15000, 18000, 12000, 22000, 8000, 25000],
    "department": ["技术", "市场", "技术", "管理", "技术", "管理"],
    "performance": ["A", "B", "A", "A", "C", "B"]
})

# query方法（更简洁的语法）
result = df.query("age > 25 and salary > 15000")
result = df.query("department == '技术' and performance == 'A'")

# 使用变量
min_age = 25
max_salary = 20000
result = df.query("age > @min_age and salary < @max_salary")
</code></pre>
<h2>字符串条件</h2>
<pre><code class="language-python"># str方法链
mask = (
    df["name"].str.len() > 1 &
    df["department"].str.contains("技") &
    ~df["performance"].str.startswith("C")
)
print(df[mask])

# 正则表达式
email_df = pd.DataFrame({
    "email": ["zhang@qq.com", "li@163.com", "wang@gmail.com", "zhao@qq.com"]
})
qq_emails = email_df[email_df["email"].str.match(r".*@qq\.com$")]
</code></pre>
<h2>数值条件</h2>
<pre><code class="language-python"># 统计条件满足的行数
print((df["salary"] > 15000).sum())  # 薪资>15000的人数

# 按条件分组统计
high = df[df["salary"] >= 15000].shape[0]
low = df[df["salary"] < 15000].shape[0]
print(f"高薪: {high}人, 低薪: {low}人")

# nlargest/nsmallest - 快速获取Top N
print(df.nlargest(3, "salary"))   # 薪资最高的3人
print(df.nsmallest(2, "age"))      # 年龄最小的2人
</code></pre>
<div class="key-point"><strong>重点：</strong><code>query()</code> 方法使用字符串表达式，语法更接近SQL，适合复杂条件。<code>nlargest()</code> 和 <code>nsmallest()</code> 比先排序再取前N更高效。<code>str</code> 访问器提供了丰富的字符串方法。</div>
            `
          },
          {
            id: 'pandas-fundamentals-09',
            title: '数据选择与过滤练习',
            type: 'practice',
            duration: 25,
            content: `
<p>通过以下练习巩固数据选择与过滤的知识。</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    "name": [f"员工{i}" for i in range(1, 51)],
    "age": np.random.randint(22, 55, 50),
    "salary": np.random.randint(5000, 30000, 50),
    "department": np.random.choice(["技术", "市场", "管理", "财务"], 50),
    "score": np.random.randint(50, 100, 50)
})

# TODO 1: 筛选技术部薪资超过15000的员工
# TODO 2: 筛选年龄在25-35之间且绩效评分>80的员工
# TODO 3: 使用query方法筛选管理部薪资最高的3人
# TODO 4: 找出每个部门薪资最高的人
# TODO 5: 筛选名字以"员工1"开头的所有员工
# TODO 6: 统计各部门薪资>15000的人数
</code></pre>
            `
          },
          {
            id: 'pandas-fundamentals-10',
            title: '第二章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对数据选择与过滤的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第三章 ====================
      {
        id: 'pandas-ch3',
        title: '第三章：数据清洗与预处理',
        lessons: [
          {
            id: 'pandas-fundamentals-11',
            title: '缺失值处理',
            type: 'theory',
            duration: 25,
            content: `
<p>缺失值（Missing Values）是真实数据中最常见的问题之一。Pandas使用NaN（Not a Number）表示缺失值，提供了丰富的缺失值检测和处理方法。</p>
<h2>检测缺失值</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

df = pd.DataFrame({
    "name": ["张三", "李四", None, "赵六", "钱七"],
    "age": [25, 30, np.nan, 35, 22],
    "salary": [15000, np.nan, 12000, 22000, np.nan],
    "city": ["北京", "上海", "广州", None, "北京"]
})

# 检测缺失值
print(df.isnull())       # 每个值是否为NaN
print(df.isnull().sum()) # 每列缺失值数量
print(df.notnull())      # 每个值是否不为NaN

# 缺失值比例
print(df.isnull().mean() * 100)  # 各列缺失百分比

# 查看含有缺失值的行
print(df[df.isnull().any(axis=1)])
</code></pre>
<h2>处理缺失值</h2>
<pre><code class="language-python"># 删除缺失值
df_clean = df.dropna()                    # 删除任何含NaN的行
df_clean = df.dropna(subset=["name"])     # 只检查name列
df_clean = df.dropna(thresh=3)            # 至少3个非NaN值才保留
df_clean = df.dropna(axis=1)               # 删除含NaN的列

# 填充缺失值
df_filled = df.fillna(0)                          # 用0填充
df_filled = df.fillna({"salary": df["salary"].mean(), "city": "未知"})
df_filled = df["salary"].fillna(df["salary"].median())  # 中位数填充

# 前向填充/后向填充
df_filled = df.fillna(method="ffill")  # 用前一个值填充
df_filled = df.fillna(method="bfill")  # 用后一个值填充

# 插值填充
df["age"] = df["age"].interpolate()  # 线性插值
</code></pre>
<h2>缺失值处理策略</h2>
<pre><code class="language-python"># 根据缺失比例决定处理方式
missing_ratio = df.isnull().mean()
cols_to_drop = missing_ratio[missing_ratio > 0.5].index
df = df.drop(columns=cols_to_drop)  # 删除缺失>50%的列

# 分组填充
df["salary"] = df.groupby("department")["salary"].transform(
    lambda x: x.fillna(x.mean())
)
</code></pre>
<div class="key-point"><strong>重点：</strong>缺失值处理没有万能方案，需要根据业务场景选择：(1) 缺失比例很高（>50%）的列考虑删除；(2) 数值列用均值/中位数填充；(3) 分类列用众数或"未知"填充；(4) 时间序列用前向/后向填充或插值。</div>
<div class="warning"><strong>注意：</strong>Pandas中 <code>None</code> 和 <code>np.nan</code> 都表示缺失值，但它们在不同列类型中的行为不同。整数列出现NaN会自动变为float64。使用 <code>pd.NA</code>（Pandas 1.0+）可以保持整数类型。</div>
            `
          },
          {
            id: 'pandas-fundamentals-12',
            title: '重复值处理与数据类型转换',
            type: 'theory',
            duration: 20,
            content: `
<p>重复数据和错误的数据类型是数据清洗中常见的问题。本课时讲解如何检测和处理重复值，以及如何正确转换数据类型。</p>
<h2>重复值处理</h2>
<pre><code class="language-python">import pandas as pd

df = pd.DataFrame({
    "name": ["张三", "李四", "张三", "王五", "李四"],
    "age": [25, 30, 25, 28, 30],
    "city": ["北京", "上海", "北京", "广州", "上海"]
})

# 检测重复行
print(df.duplicated())              # 每行是否重复
print(df.duplicated(subset=["name"])) # 基于name列判断
print(df.duplicated(keep="last"))   # 保留最后一个

# 删除重复行
df_unique = df.drop_duplicates()
df_unique = df.drop_duplicates(subset=["name"], keep="last")

# 查看重复值
dup_names = df[df.duplicated(subset=["name"], keep=False)]
print(dup_names)  # 显示所有有重复的name记录
</code></pre>
<h2>数据类型转换</h2>
<pre><code class="language-python"># 查看数据类型
print(df.dtypes)

# astype 转换
df["age"] = df["age"].astype(float)
df["age"] = df["age"].astype(int)

# to_numeric（更安全）
df["price"] = pd.to_numeric(df["price"], errors="coerce")  # 无效值变NaN
df["price"] = pd.to_numeric(df["price"], errors="ignore")  # 忽略错误

# to_datetime
df["date"] = pd.to_datetime(df["date_str"])
df["date"] = pd.to_datetime(df["date_str"], format="%Y-%m-%d")

# to_string / category
df["department"] = df["department"].astype("category")  # 节省内存

# 智能类型转换
df = df.convert_dtypes()  # Pandas 1.0+ 自动推断最佳类型
</code></pre>
<h2>数据标准化</h2>
<pre><code class="language-python"># 字符串标准化
df["name"] = df["name"].str.strip().str.title()
df["city"] = df["city"].str.upper()

# 数值标准化
df["salary_normalized"] = (
    (df["salary"] - df["salary"].mean()) / df["salary"].std()
)

# Min-Max标准化
df["salary_minmax"] = (
    (df["salary"] - df["salary"].min()) / 
    (df["salary"].max() - df["salary"].min())
)
</code></pre>
<div class="key-point"><strong>重点：</strong><code>pd.to_numeric(errors="coerce")</code> 是处理混合类型数值列的最佳方式，无效值会被转为NaN。<code>astype("category")</code> 可以大幅减少重复字符串列的内存占用。<code>pd.to_datetime</code> 是解析日期的标准方式。</div>
            `
          },
          {
            id: 'pandas-fundamentals-13',
            title: '字符串处理方法',
            type: 'theory',
            duration: 20,
            content: `
<p>Pandas的str访问器提供了丰富的字符串处理方法，可以高效地对整列文本数据进行操作。</p>
<h2>常用字符串方法</h2>
<pre><code class="language-python">import pandas as pd

df = pd.DataFrame({
    "name": ["  张三  ", "李四", "  王五  ", "赵六"],
    "email": ["Zhang@QQ.COM", "li@163.com", "WANG@gmail.com", "zhao@qq.com"],
    "phone": ["138-1234-5678", "139-8765-4321", "136-5555-6666", "137-9999-8888"]
})

# 基本操作
df["name"] = df["name"].str.strip()       # 去除两端空白
df["name"] = df["name"].str.lower()       # 转小写
df["name"] = df["name"].str.upper()       # 转大写
df["name"] = df["name"].str.title()       # 首字母大写

# 替换
df["phone"] = df["phone"].str.replace("-", "")  # 去掉连字符

# 提取
df["domain"] = df["email"].str.split("@").str[1]  # 提取域名
df["first_char"] = df["name"].str[0]               # 第一个字符

# 匹配与过滤
mask = df["email"].str.contains("qq", case=False)
mask = df["email"].str.match(r".*@qq\.com$")  # 正则匹配

# 长度
df["name_len"] = df["name"].str.len()

# 判断
df["has_number"] = df["name"].str.isdigit()
df["is_alpha"] = df["name"].str.isalpha()
</code></pre>
<h2>字符串提取与替换</h2>
<pre><code class="language-python"># extract - 正则提取
df = pd.DataFrame({
    "address": ["北京市朝阳区XX路1号", "上海市浦东新区YY路2号"]
})
df[["city", "district"]] = df["address"].str.extract(
    r"(北京市|上海市)(.+?区)"
)

# extractall - 提取所有匹配
dates = pd.Series(["2024-01-15", "2024-02-20", "2024-03-25"])
parts = dates.str.extract(r"(\d{4})-(\d{2})-(\d{2})")
parts.columns = ["year", "month", "day"]
</code></pre>
<div class="key-point"><strong>重点：</strong>str访问器的方法与Python字符串方法一一对应，但可以对整列进行向量化操作，比apply+lambda更高效。<code>extract()</code> 使用正则捕获组提取数据，<code>contains()</code> 用于模糊匹配。</div>
            `
          },
          {
            id: 'pandas-fundamentals-14',
            title: '数据清洗与预处理练习',
            type: 'practice',
            duration: 30,
            content: `
<p>通过以下练习巩固数据清洗与预处理的知识。</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    "name": [f"员工{i}" for i in range(1, 101)],
    "age": np.random.randint(22, 55, 100).astype(float),
    "salary": np.random.randint(5000, 30000, 100).astype(float),
    "department": np.random.choice(["技术", "市场", "管理", "财务"], 100),
    "email": [f"user{i}@example.com" for i in range(1, 101)]
})

# 注入问题
df.loc[np.random.choice(100, 10), "age"] = np.nan
df.loc[np.random.choice(100, 8), "salary"] = np.nan
df.loc[np.random.choice(100, 5), "department"] = np.nan

# TODO 1: 生成数据质量报告（各列缺失数量和比例）
# TODO 2: 用中位数填充age缺失值
# TODO 3: 按部门均值填充salary缺失值
# TODO 4: 用众数填充department缺失值
# TODO 5: 添加3条重复记录并去重
# TODO 6: 将email列转为小写
# TODO 7: 从email提取用户名（@前面的部分）
# TODO 8: 添加salary_zscore列
# TODO 9: 标记异常值（|z| > 2.5）
# TODO 10: 保存清洗后的数据
</code></pre>
            `
          },
          {
            id: 'pandas-fundamentals-15',
            title: '第三章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对数据清洗与预处理的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第四章 ====================
      {
        id: 'pandas-ch4',
        title: '第四章：数据聚合与分组',
        lessons: [
          {
            id: 'pandas-fundamentals-16',
            title: 'groupby分组操作',
            type: 'theory',
            duration: 25,
            content: `
<p>分组聚合是数据分析中最强大的操作之一。Pandas的groupby操作类似于SQL的GROUP BY，可以按某一列或多列将数据分组，然后对每组应用聚合函数。</p>
<h2>基本分组</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

df = pd.DataFrame({
    "department": ["技术", "市场", "技术", "管理", "技术", "市场", "管理", "技术"],
    "name": ["张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十"],
    "salary": [15000, 12000, 18000, 22000, 13000, 14000, 25000, 16000],
    "age": [25, 30, 28, 35, 22, 32, 40, 27]
})

# 基本分组聚合
dept_stats = df.groupby("department")["salary"].mean()
print(dept_stats)

# 多种聚合函数
dept_stats = df.groupby("department")["salary"].agg(
    ["mean", "median", "min", "max", "count", "std"]
)
print(dept_stats)

# 对多列聚合
dept_all = df.groupby("department").agg({
    "salary": ["mean", "sum"],
    "age": "mean"
})
print(dept_all)
</code></pre>
<h2>自定义聚合</h2>
<pre><code class="language-python"># 使用命名聚合
result = df.groupby("department").agg(
    平均薪资=("salary", "mean"),
    最高薪资=("salary", "max"),
    人数=("name", "count"),
    平均年龄=("age", "mean")
)
print(result)

# 自定义聚合函数
def salary_range(series):
    return series.max() - series.min()

result = df.groupby("department")["salary"].agg(
    mean_salary="mean",
    range=salary_range
)
print(result)
</code></pre>
<h2>transform与filter</h2>
<pre><code class="language-python"># transform - 保持原始形状
df["dept_avg_salary"] = df.groupby("department")["salary"].transform("mean")
df["salary_diff"] = df["salary"] - df["dept_avg_salary"]

# filter - 按组条件过滤
big_depts = df.groupby("department").filter(lambda x: len(x) >= 3)
print(big_depts)

# 高薪部门（平均薪资>15000）
high_salary_depts = df.groupby("department").filter(
    lambda x: x["salary"].mean() > 15000
)
</code></pre>
<div class="key-point"><strong>重点：</strong><code>groupby().agg()</code> 支持字符串函数名、自定义函数和命名聚合。<code>transform()</code> 返回与原DataFrame相同形状的结果，适合添加计算列。<code>filter()</code> 按组条件过滤整组数据。</div>
            `
          },
          {
            id: 'pandas-fundamentals-17',
            title: '透视表与交叉表',
            type: 'theory',
            duration: 20,
            content: `
<p>透视表（Pivot Table）和交叉表（Crosstab）是数据汇总分析的重要工具，类似于Excel中的数据透视表功能。</p>
<h2>透视表</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

df = pd.DataFrame({
    "date": pd.date_range("2024-01", periods=12, freq="M"),
    "region": ["华东"]*3 + ["华南"]*3 + ["华北"]*3 + ["华中"]*3,
    "product": ["A","B","C"]*4,
    "sales": np.random.randint(100, 500, 12)
})

# 基本透视表
pivot = df.pivot_table(
    values="sales",
    index="region",
    columns="product",
    aggfunc="sum"
)
print(pivot)

# 多种聚合
pivot = df.pivot_table(
    values="sales",
    index="region",
    columns="product",
    aggfunc=["sum", "mean", "count"]
)

# 添加汇总行和列
pivot = df.pivot_table(
    values="sales",
    index="region",
    columns="product",
    aggfunc="sum",
    margins=True,       # 添加汇总
    margins_name="合计"
)
print(pivot)

# 多级索引
pivot = df.pivot_table(
    values="sales",
    index=["region", "product"],
    aggfunc="sum"
)
</code></pre>
<h2>交叉表</h2>
<pre><code class="language-python"># 交叉表 - 计算频率
df = pd.DataFrame({
    "gender": ["男", "女", "男", "女", "男", "女", "男", "女"],
    "department": ["技术", "技术", "市场", "市场", "技术", "市场", "管理", "管理"],
    "count": [1, 1, 1, 1, 1, 1, 1, 1]
})

# 频率交叉表
ct = pd.crosstab(df["gender"], df["department"])
print(ct)

# 带聚合的交叉表
ct = pd.crosstab(
    df["gender"],
    df["department"],
    values=df["count"],
    aggfunc="sum",
    margins=True
)

# 归一化
ct_norm = pd.crosstab(df["gender"], df["department"], normalize="index")
print(ct_norm.round(2))
</code></pre>
<div class="key-point"><strong>重点：</strong><code>pivot_table</code> 适合对一个值列进行多维度汇总。<code>crosstab</code> 专门用于计算两个分类变量的频率分布。<code>normalize</code> 参数支持按行（index）、列（columns）或全部（all）归一化。</div>
            `
          },
          {
            id: 'pandas-fundamentals-18',
            title: '数据聚合与分组练习',
            type: 'practice',
            duration: 30,
            content: `
<p>通过以下练习巩固数据聚合与分组的知识。</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

np.random.seed(42)
df = pd.DataFrame({
    "department": np.random.choice(["技术", "市场", "管理", "财务"], 200),
    "level": np.random.choice(["初级", "中级", "高级"], 200),
    "salary": np.random.randint(5000, 35000, 200),
    "experience": np.random.randint(1, 20, 200),
    "performance": np.random.choice(["A", "B", "C", "D"], 200)
})

# TODO 1: 按部门统计薪资的均值、中位数、标准差
# TODO 2: 按部门和级别统计人数和平均薪资（命名聚合）
# TODO 3: 找出每个部门薪资最高的人
# TODO 4: 添加列：每个人薪资与部门平均薪资的差值
# TODO 5: 创建部门-级别薪资透视表
# TODO 6: 创建绩效等级交叉表（按部门归一化）
# TODO 7: 筛选人数>=20的部门
</code></pre>
            `
          },
          {
            id: 'pandas-fundamentals-19',
            title: '第四章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对数据聚合与分组的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第五章 ====================
      {
        id: 'pandas-ch5',
        title: '第五章：数据合并与连接',
        lessons: [
          {
            id: 'pandas-fundamentals-20',
            title: 'merge合并操作',
            type: 'theory',
            duration: 25,
            content: `
<p>数据合并是数据分析中常见的操作，类似于SQL的JOIN。Pandas的merge()函数可以根据一个或多个键将不同DataFrame连接在一起。</p>
<h2>基本merge</h2>
<pre><code class="language-python">import pandas as pd

# 员工信息表
employees = pd.DataFrame({
    "emp_id": [1, 2, 3, 4, 5],
    "name": ["张三", "李四", "王五", "赵六", "钱七"],
    "dept_id": [101, 102, 101, 103, 102]
})

# 部门信息表
departments = pd.DataFrame({
    "dept_id": [101, 102, 103, 104],
    "dept_name": ["技术部", "市场部", "管理部", "财务部"],
    "manager": ["周总", "吴总", "郑总", "王总"]
})

# 内连接（默认）- 只保留匹配的行
inner = pd.merge(employees, departments, on="dept_id")
print(inner)

# 左连接 - 保留左表所有行
left = pd.merge(employees, departments, on="dept_id", how="left")

# 右连接 - 保留右表所有行
right = pd.merge(employees, departments, on="dept_id", how="right")

# 外连接 - 保留所有行
outer = pd.merge(employees, departments, on="dept_id", how="outer")
</code></pre>
<h2>多键合并</h2>
<pre><code class="language-python"># 多键合并
orders = pd.DataFrame({
    "customer_id": [1, 2, 1, 3],
    "product_id": [101, 102, 103, 101],
    "amount": [500, 300, 200, 600]
})

products = pd.DataFrame({
    "product_id": [101, 102, 103, 104],
    "product_name": ["手机", "电脑", "耳机", "键盘"],
    "price": [2999, 5999, 299, 199
]})

result = pd.merge(orders, products, on="product_id", how="left")

# 不同列名合并
result = pd.merge(
    left_df, right_df,
    left_on="id_left",
    right_on="id_right"
)
</code></pre>
<h2>合并参数</h2>
<pre><code class="language-python"># indicator - 显示合并来源
result = pd.merge(
    employees, departments,
    on="dept_id", how="outer",
    indicator=True  # 添加_merge列
)

# suffixes - 处理重名列
result = pd.merge(
    df1, df2, on="id",
    suffixes=("_left", "_right")
)

# validate - 验证合并类型
result = pd.merge(
    employees, departments,
    on="dept_id",
    validate="many_to_one"  # 检查是否多对一
)
</code></pre>
<div class="key-point"><strong>重点：</strong>merge的how参数：inner（交集）、left（保留左表）、right（保留右表）、outer（并集）。on指定连接键，left_on/right_on用于不同列名。<code>validate</code> 参数可以在合并时验证关系类型，防止意外的多对多合并。</div>
            `
          },
          {
            id: 'pandas-fundamentals-21',
            title: 'concat连接与数据重塑',
            type: 'theory',
            duration: 20,
            content: `
<p>除了merge之外，concat用于纵向或横向拼接DataFrame，melt和pivot用于数据的长宽格式转换。</p>
<h2>concat连接</h2>
<pre><code class="language-python">import pandas as pd

# 纵向拼接（行方向）
df1 = pd.DataFrame({"A": [1, 2], "B": [3, 4]})
df2 = pd.DataFrame({"A": [5, 6], "B": [7, 8]})

result = pd.concat([df1, df2], ignore_index=True)
print(result)

# 横向拼接（列方向）
result = pd.concat([df1, df2], axis=1)

# 带键的拼接
result = pd.concat([df1, df2], keys=["Q1", "Q2"])
print(result.loc["Q1"])
</code></pre>
<h2>melt与pivot（长宽转换）</h2>
<pre><code class="language-python"># 宽格式 -> 长格式 (melt)
wide = pd.DataFrame({
    "name": ["张三", "李四"],
    "math": [92, 78],
    "english": [85, 92],
    "physics": [88, 65]
})

long = wide.melt(
    id_vars=["name"],       # 保持不变的列
    value_vars=["math", "english", "physics"],  # 要融化的列
    var_name="subject",     # 变量名列
    value_name="score"      # 值列
)
print(long)

# 长格式 -> 宽格式 (pivot_table)
wide_back = long.pivot_table(
    index="name",
    columns="subject",
    values="score"
)
print(wide_back)
</code></pre>
<h2>join操作</h2>
<pre><code class="language-python"># join - 基于索引合并
left = pd.DataFrame({"A": [1, 2, 3]}, index=["a", "b", "c"])
right = pd.DataFrame({"B": [4, 5, 6]}, index=["a", "b", "d"])

result = left.join(right, how="outer")
print(result)

# 多个DataFrame join
result = df1.join([df2, df3], how="outer")
</code></pre>
<div class="key-point"><strong>重点：</strong><code>merge</code> 基于列值连接，<code>join</code> 基于索引连接。<code>concat</code> 简单拼接。<code>melt</code> 将宽格式转为长格式（适合分析），<code>pivot_table</code> 将长格式转为宽格式（适合展示）。</div>
            `
          },
          {
            id: 'pandas-fundamentals-22',
            title: '数据合并与连接练习',
            type: 'practice',
            duration: 25,
            content: `
<p>通过以下练习巩固数据合并与连接的知识。</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

# ========== 练习1：多表合并 ==========
employees = pd.DataFrame({
    "emp_id": range(1, 21),
    "name": [f"员工{i}" for i in range(1, 21)],
    "dept_id": np.random.choice([101, 102, 103], 20)
})

departments = pd.DataFrame({
    "dept_id": [101, 102, 103],
    "dept_name": ["技术部", "市场部", "管理部"]
})

salaries = pd.DataFrame({
    "emp_id": range(1, 21),
    "salary": np.random.randint(5000, 25000, 20)
})

# TODO 1: 合并employees和departments（左连接）
# TODO 2: 再与salaries合并
# TODO 3: 按部门统计平均薪资

# ========== 练习2：数据重塑 ==========
scores = pd.DataFrame({
    "name": ["张三", "张三", "张三", "李四", "李四", "李四"],
    "subject": ["数学", "英语", "物理", "数学", "英语", "物理"],
    "score": [92, 85, 88, 78, 92, 65]
})

# TODO 4: 将scores转为宽格式（每科一列）
# TODO 5: 再转回长格式
# TODO 6: 添加总分和平均分列
</code></pre>
            `
          },
          {
            id: 'pandas-fundamentals-23',
            title: '第五章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对数据合并与连接的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第六章 ====================
      {
        id: 'pandas-ch6',
        title: '第六章：时间序列分析',
        lessons: [
          {
            id: 'pandas-fundamentals-24',
            title: '时间索引与日期解析',
            type: 'theory',
            duration: 25,
            content: `
<p>时间序列数据在金融、电商、物联网等领域非常普遍。Pandas提供了强大的时间序列处理能力，包括日期解析、时间索引、频率转换和滚动计算等。</p>
<h2>日期解析</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

# pd.to_datetime - 解析日期
dates = pd.to_datetime(["2024-01-15", "2024-02-20", "2024-03-25"])
print(dates)

# 从字符串列解析
df = pd.DataFrame({
    "date_str": ["2024/01/15", "2024/02/20", "2024/03/25"],
    "value": [100, 200, 150]
})
df["date"] = pd.to_datetime(df["date_str"])

# 指定格式（更快）
df["date"] = pd.to_datetime(df["date_str"], format="%Y/%m/%d")

# 提取日期组件
df["year"] = df["date"].dt.year
df["month"] = df["date"].dt.month
df["day"] = df["date"].dt.day
df["weekday"] = df["date"].dt.day_name()
df["quarter"] = df["date"].dt.quarter
</code></pre>
<h2>时间索引</h2>
<pre><code class="language-python"># 设置日期索引
df.set_index("date", inplace=True)
print(df.index)  # DatetimeIndex

# 创建日期范围
dates = pd.date_range("2024-01-01", periods=365, freq="D")
print(dates)

# 常用频率
pd.date_range("2024-01", periods=12, freq="M")   # 月末
pd.date_range("2024-01", periods=12, freq="MS")  # 月初
pd.date_range("2024-01-01", periods=52, freq="W") # 周
pd.date_range("2024-01-01", periods=8760, freq="H")  # 小时

# 创建带时间索引的DataFrame
dates = pd.date_range("2024-01-01", periods=100, freq="D")
ts = pd.DataFrame({
    "sales": np.random.randint(100, 500, 100),
    "visitors": np.random.randint(50, 200, 100)
}, index=dates)
</code></pre>
<h2>时间索引操作</h2>
<pre><code class="language-python"># 切片
print(ts["2024-01"])           # 2024年1月
print(ts["2024-01":"2024-03"]) # 2024年1月到3月
print(ts["2024-01-15"])        # 某一天

# asfreq - 改变频率
ts_daily = ts.asfreq("D")  # 每日
ts_monthly = ts.asfreq("M")  # 每月末

# 前向填充缺失值
ts_monthly = ts.asfreq("M", method="ffill")
</code></pre>
<div class="key-point"><strong>重点：</strong>设置DatetimeIndex后，可以使用日期字符串直接切片，这是Pandas时间序列最方便的特性。<code>pd.date_range</code> 的freq参数支持D(日)、W(周)、M(月末)、MS(月初)、H(小时)等。<code>dt</code> 访问器用于提取日期组件。</div>
            `
          },
          {
            id: 'pandas-fundamentals-25',
            title: '时间重采样与滚动窗口',
            type: 'theory',
            duration: 20,
            content: `
<p>时间重采样（resample）和滚动窗口（rolling）是时间序列分析的核心操作。重采样用于改变数据频率，滚动窗口用于计算滑动统计量。</p>
<h2>resample重采样</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np

# 创建日度数据
dates = pd.date_range("2024-01-01", periods=90, freq="D")
ts = pd.DataFrame({
    "sales": np.random.randint(100, 500, 90),
    "visitors": np.random.randint(50, 200, 90)
}, index=dates)

# 降采样（日 -> 周）
weekly = ts.resample("W").agg({
    "sales": ["sum", "mean"],
    "visitors": "sum"
})

# 降采样（日 -> 月）
monthly = ts.resample("M").agg({
    "sales": "sum",
    "visitors": "mean"
})

# 升采样（月 -> 日，需要填充）
monthly_to_daily = monthly.resample("D").ffill()

# OHLC重采样（金融数据常用）
ohlc = ts["sales"].resample("W").ohlc()
</code></pre>
<h2>rolling滚动窗口</h2>
<pre><code class="language-python"># 7日滚动平均
ts["sales_7d_avg"] = ts["sales"].rolling(window=7).mean()

# 30日滚动标准差
ts["sales_30d_std"] = ts["sales"].rolling(window=30).std()

# 滚动最大值/最小值
ts["sales_7d_max"] = ts["sales"].rolling(window=7).max()
ts["sales_7d_min"] = ts["sales"].rolling(window=7).min()

# 指数加权移动平均（EWMA）
ts["sales_ewma"] = ts["sales"].ewm(span=7).mean()

# 滚动相关系数
ts["sales_visitors_corr"] = ts["sales"].rolling(30).corr(ts["visitors"])
</code></pre>
<h2>shift与diff</h2>
<pre><code class="language-python"># shift - 移动数据
ts["sales_lag1"] = ts["sales"].shift(1)   # 前一天
ts["sales_lag7"] = ts["sales"].shift(7)   # 前7天

# diff - 差分
ts["sales_diff"] = ts["sales"].diff(1)    # 日环比
ts["sales_pct"] = ts["sales"].pct_change() # 百分比变化

# 环比增长率
ts["growth_rate"] = ts["sales"].pct_change() * 100
</code></pre>
<div class="key-point"><strong>重点：</strong><code>resample</code> 用于改变频率（降采样用聚合，升采样用填充）。<code>rolling</code> 计算滑动窗口统计量。<code>shift</code> 创建滞后特征，<code>diff</code> 计算差分，<code>pct_change</code> 计算变化率。</div>
            `
          },
          {
            id: 'pandas-fundamentals-26',
            title: '时间序列分析练习',
            type: 'practice',
            duration: 25,
            content: `
<p>通过以下练习巩固时间序列分析的知识。</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

np.random.seed(42)
dates = pd.date_range("2023-01-01", periods=365, freq="D")
base = 1000 + np.arange(365) * 2  # 上升趋势
seasonal = np.sin(np.arange(365) * 2 * np.pi / 365) * 200
noise = np.random.normal(0, 50, 365)
sales = base + seasonal + noise

ts = pd.DataFrame({"sales": sales}, index=dates)

# TODO 1: 计算月度总销售额
# TODO 2: 计算7日和30日滚动平均
# TODO 3: 计算日环比和环比增长率
# TODO 4: 计算滚动7日标准差
# TODO 5: 添加月份和星期几列
# TODO 6: 按星期几统计平均销售额
# TODO 7: 找出销售额最高的10天
</code></pre>
            `
          },
          {
            id: 'pandas-fundamentals-27',
            title: '第六章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对时间序列分析的掌握程度。</p>`
          }
        ]
      },
      // ==================== 第七章 ====================
      {
        id: 'pandas-ch7',
        title: '第七章：数据可视化与综合项目',
        lessons: [
          {
            id: 'pandas-fundamentals-28',
            title: 'Matplotlib集成与图表类型',
            type: 'theory',
            duration: 25,
            content: `
<p>Pandas内置了基于Matplotlib的绘图功能，可以快速创建常见图表。对于更复杂的可视化需求，可以直接使用Matplotlib或Seaborn。</p>
<h2>Pandas内置绘图</h2>
<pre><code class="language-python">import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

# 设置中文字体
plt.rcParams['font.sans-serif'] = ['SimHei']
plt.rcParams['axes.unicode_minus'] = False

df = pd.DataFrame({
    "month": pd.date_range("2024-01", periods=12, freq="M"),
    "sales": [120, 135, 98, 156, 142, 168, 175, 190, 165, 200, 210, 230],
    "cost": [80, 90, 65, 100, 95, 110, 115, 125, 108, 130, 140, 150]
})

# 折线图
df.plot(x="month", y=["sales", "cost"], figsize=(10, 5))
plt.title("月度销售与成本趋势")
plt.ylabel("金额（万元）")
plt.legend(["销售额", "成本"])
plt.show()

# 柱状图
df.plot(x="month", y="sales", kind="bar", figsize=(10, 5))
plt.title("月度销售额")
plt.show()

# 直方图
df["sales"].plot(kind="hist", bins=10, figsize=(8, 5))
plt.title("销售额分布")
plt.xlabel("销售额（万元）")
plt.show()

# 散点图
df.plot(x="cost", y="sales", kind="scatter", figsize=(8, 5))
plt.title("成本与销售额关系")
plt.show()

# 箱线图
df[["sales", "cost"]].plot(kind="box", figsize=(8, 5))
plt.title("销售额与成本分布")
plt.show()
</code></pre>
<h2>Seaborn基础</h2>
<pre><code class="language-python">import seaborn as sns

# 设置样式
sns.set_style("whitegrid")

# 热力图（相关系数矩阵）
corr = df[["sales", "cost"]].corr()
sns.heatmap(corr, annot=True, cmap="coolwarm")
plt.title("相关系数热力图")
plt.show()

# 分组柱状图
tips = sns.load_dataset("tips")
sns.barplot(x="day", y="total_bill", data=tips)
plt.title("各日平均消费")
plt.show()

# 分布图
sns.histplot(data=tips, x="total_bill", kde=True)
plt.title("消费金额分布")
plt.show()
</code></pre>
<div class="key-point"><strong>重点：</strong>Pandas的 <code>plot()</code> 方法适合快速探索性分析。Matplotlib提供更精细的控制。Seaborn提供统计可视化的高级接口。中文显示需要设置 <code>plt.rcParams['font.sans-serif']</code>。</div>
            `
          },
          {
            id: 'pandas-fundamentals-29',
            title: '数据导出与报告生成',
            type: 'theory',
            duration: 15,
            content: `
<p>数据分析的最后一步是将结果导出和呈现。Pandas支持多种输出格式，可以满足不同的需求。</p>
<h2>数据导出</h2>
<pre><code class="language-python">import pandas as pd

# CSV导出
df.to_csv("report.csv", index=False, encoding="utf-8-sig")  # utf-8-sig兼容Excel

# Excel导出（多Sheet）
with pd.ExcelWriter("report.xlsx", engine="openpyxl") as writer:
    df_summary.to_excel(writer, sheet_name="摘要", index=False)
    df_detail.to_excel(writer, sheet_name="明细", index=False)

# JSON导出
df.to_json("report.json", force_ascii=False, indent=2, orient="records")

# HTML导出
df.to_html("report.html", index=False)

# Markdown导出
md = df.to_markdown()
</code></pre>
<h2>格式化输出</h2>
<pre><code class="language-python"># 设置显示格式
pd.set_option('display.float_format', '{:,.2f}'.format)
pd.set_option('display.max_columns', 20)

# DataFrame样式（Jupyter中显示）
df.style.format({
    "salary": "{:,.0f}",
    "rate": "{:.1%}"
}).background_gradient(subset=["salary"], cmap="YlOrRd")
</code></pre>
<div class="key-point"><strong>重点：</strong>导出中文CSV时使用 <code>utf-8-sig</code> 编码，Excel打开不会乱码。<code>ExcelWriter</code> 可以将多个DataFrame写入同一Excel文件的不同Sheet。</div>
            `
          },
          {
            id: 'pandas-fundamentals-30',
            title: '综合分析项目',
            type: 'practice',
            duration: 40,
            content: `
<p>综合运用Pandas全部知识，完成一个完整的电商数据分析项目。</p>
<pre><code class="language-python">import pandas as pd
import numpy as np

# ========== 数据生成 ==========
np.random.seed(42)
n = 500
dates = pd.date_range("2023-01-01", periods=n, freq="D")
products = ["手机", "电脑", "耳机", "键盘", "显示器", "鼠标"]
regions = ["华东", "华南", "华北", "华中", "西南"]

orders = pd.DataFrame({
    "date": np.random.choice(dates, n),
    "product": np.random.choice(products, n),
    "region": np.random.choice(regions, n),
    "quantity": np.random.randint(1, 10, n),
    "unit_price": np.random.randint(50, 5000, n)
})
orders["amount"] = orders["quantity"] * orders["unit_price"]

# TODO 1: 数据质量检查（缺失值、重复值、数据类型）
# TODO 2: 按月统计销售额趋势
# TODO 3: 各商品销量和销售额排名
# TODO 4: 各区域销售分析（透视表）
# TODO 5: 时间序列分析（7日滚动平均、环比增长率）
# TODO 6: 找出销售额TOP10的日子
# TODO 7: 生成可视化图表（趋势图、柱状图、饼图）
# TODO 8: 导出分析报告（Excel多Sheet）
</code></pre>
            `
          },
          {
            id: 'pandas-fundamentals-31',
            title: '课程总结与进阶方向',
            type: 'theory',
            duration: 15,
            content: `
<p>恭喜你完成了Pandas数据分析课程的学习！本课时对整个课程进行回顾总结。</p>
<h2>课程知识体系回顾</h2>
<ul>
  <li><strong>第一章</strong>：Pandas入门 -- Series、DataFrame、数据读写</li>
  <li><strong>第二章</strong>：数据选择与过滤 -- loc/iloc、条件筛选、query</li>
  <li><strong>第三章</strong>：数据清洗与预处理 -- 缺失值、重复值、类型转换、字符串处理</li>
  <li><strong>第四章</strong>：数据聚合与分组 -- groupby、透视表、交叉表</li>
  <li><strong>第五章</strong>：数据合并与连接 -- merge、concat、melt/pivot</li>
  <li><strong>第六章</strong>：时间序列分析 -- 时间索引、重采样、滚动窗口</li>
  <li><strong>第七章</strong>：数据可视化与综合项目 -- Matplotlib、Seaborn、报告生成</li>
</ul>
<h2>进阶学习方向</h2>
<ul>
  <li><strong>数据可视化</strong>：Matplotlib高级定制、Seaborn统计图表、Plotly交互式图表</li>
  <li><strong>统计分析</strong>：假设检验、回归分析、A/B测试</li>
  <li><strong>机器学习</strong>：Scikit-learn、特征工程、模型评估</li>
  <li><strong>大数据处理</strong>：Dask、Polars、PySpark</li>
  <li><strong>数据库</strong>：SQL进阶、ORM、数据仓库</li>
</ul>
<div class="key-point"><strong>重点：</strong>Pandas是数据分析的核心工具，但不是终点。建议在实际项目中不断练习，结合业务场景深入理解数据。推荐阅读Wes McKinney的《利用Python进行数据分析》第二版获取更深入的知识。</div>
<div class="tip"><strong>提示：</strong>日常练习资源：Kaggle竞赛平台、UCI机器学习仓库、政府开放数据平台。每天用Pandas处理一些真实数据，是提升技能的最佳方式。</div>
            `
          },
          {
            id: 'pandas-fundamentals-32',
            title: '第七章综合测验',
            type: 'quiz',
            duration: 15,
            content: `<p>测试你对Pandas数据分析全课程的掌握程度。</p>`
          }
        ]
      }
    ]
  }
];
