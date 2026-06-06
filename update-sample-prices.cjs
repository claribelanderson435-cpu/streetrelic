const fs = require('fs');
const path = require('path');

// 读取文件内容
const filePath = path.join(__dirname, 'src/mocks/productData.ts');
let content = fs.readFileSync(filePath, 'utf8');

// 定义规则：哪些分类的产品样品价为 $50
const $50Categories = ['T-Shirts', 'Caps', 'Bags'];

// 使用正则表达式找到每个产品并更新 samplePrice
// 匹配产品对象，提取 categories 和 samplePrice

const productRegex = /(\{[\s\S]*?id:\s*(\d+),[\s\S]*?categories:\s*\[([^\]]+)\][\s\S]*?)(samplePrice:\s*[\d.]+,?\s*\/\/ 样品价格)?([\s\S]*?)(?=\{[\s\S]*?id:\s*\d+,|\]\s*;)/g;

let match;
let updates = [];

// 先找出所有需要更新的产品
content = content.replace(
  /(\{[\s\S]*?)id:\s*(\d+),([\s\S]*?)categories:\s*\[([^\]]+)\]([\s\S]*?)(samplePrice:\s*[\d.]+,?\s*\/\/\s*样品价格)?([\s\S]*?)(?=\n\s*\{[\s\S]*?id:\s*\d+,|\n\];)/g,
  (fullMatch, before, id, middle, categories, after, existingSample, rest) => {
    const categoryList = categories.split(',').map(c => c.trim().replace(/"/g, ''));
    const is$50 = categoryList.some(cat => $50Categories.some(target => cat.includes(target)));
    const newPrice = is$50 ? 50 : 100;
    
    // 如果已有 samplePrice，替换；否则添加
    if (existingSample) {
      return `${before}id: ${id},${middle}categories: [${categories}]${after}samplePrice: ${newPrice},  // 样品价格${rest}`;
    } else {
      // 在 price 后添加 samplePrice
      const updated = fullMatch.replace(
        /(price:\s*[\d.]+,)/,
        `$1\n    samplePrice: ${newPrice},  // 样品价格`
      );
      return updated;
    }
  }
);

fs.writeFileSync(filePath, content, 'utf8');
console.log('Sample prices updated successfully!');
