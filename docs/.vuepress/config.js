import { blogPlugin } from "@vuepress/plugin-blog";
import { defaultTheme } from "@vuepress/theme-default";
import { defineUserConfig } from "vuepress";
import { viteBundler } from "@vuepress/bundler-vite";

export default defineUserConfig({
    lang: "zh-CN",

    title: "极客先生",
    description: "专注 AI、编程、科技领域，公众号同名！",

    theme: defaultTheme({
        logo: "https://vuejs.press/images/hero.png",

        navbar: [
            "/",
            {
                text: "信息技术",
                link: "/it/",
                children: [
                    {
                        text: "计算机原理",
                        link: "/it/principle-of-computer/"
                    },
                    {
                        text: "后端开发",
                        link: "/it/back-develop/"
                    },
                    {
                        text: "鸿蒙开发",
                        link: "/it/harmonney-develop/"
                    },
                    {
                        text: "随笔随笔",
                        link: "/it/informal-essay/"
                    },
                    {
                        text: "编程语言",
                        link: "/it/code-lanuage/"
                    },
                    {
                        text: "骇客技术",
                        link: "/it/hacker-technology/"
                    },
                    {
                        text: "其他技术",
                        link: "/it/others-technology/"
                    },
                    {
                        text: "安卓开发",
                        link: "/it/android-develop/"
                    },
                    {
                        text: "硬件开发",
                        link: "/it/hardware-develop/"
                    },
                    {
                        text: "软件测试",
                        link: "/it/test-software/"
                    },
                    {
                        text: "前端开发",
                        link: "/it/front-develop/"
                    },
                    {
                        text: "产品设计",
                        link: "/it/product-develop/"
                    },
                    {
                        text: "视觉设计",
                        link: "/it/vision-design/"
                    },
                    {
                        text: "操作系统",
                        link: "/it/system/"
                    }
                ]
            },
            {
                text: "文章",
                link: "/article/",
            },
            {
                text: "分类",
                link: "/category/",
            },
            {
                text: "标签",
                link: "/tag/",
            },
            {
                text: "时间线",
                link: "/timeline/",
            },
        ],
        locales: {
          '/': {
            selectLanguageName: '简体中文',
          },
          '/en/': {
            selectLanguageName: 'English',
          },
        }
    }),

    plugins: [
        blogPlugin({
            // Getting article info
            getInfo: ({ frontmatter, title, data }) => ({
                title,
                author: frontmatter.author || "",
                date: frontmatter.date || null,
                category: frontmatter.category || [],
                tag: frontmatter.tag || [],
                excerpt:
                    // Support manually set excerpt through frontmatter
                    typeof frontmatter.excerpt === "string" ? frontmatter.excerpt : data?.excerpt || "",
            }),

            // Generate excerpt for all pages excerpt those users choose to disable
            excerptFilter: ({ frontmatter }) => !frontmatter.home && frontmatter.excerpt !== false && typeof frontmatter.excerpt !== "string",

            category: [
                {
                    key: "category",
                    getter: (page) => page.frontmatter.category || [],
                    layout: "Category",
                    itemLayout: "Category",
                    frontmatter: () => ({
                        title: "Categories",
                        sidebar: false,
                    }),
                    itemFrontmatter: (name) => ({
                        title: `Category ${name}`,
                        sidebar: false,
                    }),
                },
                {
                    key: "tag",
                    getter: (page) => page.frontmatter.tag || [],
                    layout: "Tag",
                    itemLayout: "Tag",
                    frontmatter: () => ({
                        title: "Tags",
                        sidebar: false,
                    }),
                    itemFrontmatter: (name) => ({
                        title: `Tag ${name}`,
                        sidebar: false,
                    }),
                }
            ],

            type: [
                {
                    key: "article",
                    // Remove archive articles
                    filter: (page) => !page.frontmatter.archive,
                    layout: "Article",
                    frontmatter: () => ({
                        title: "Articles",
                        sidebar: false,
                    }),
                    // Sort pages with time and sticky
                    sorter: (pageA, pageB) => {
                        if (pageA.frontmatter.sticky && pageB.frontmatter.sticky) return pageB.frontmatter.sticky - pageA.frontmatter.sticky;

                        if (pageA.frontmatter.sticky && !pageB.frontmatter.sticky) return -1;

                        if (!pageA.frontmatter.sticky && pageB.frontmatter.sticky) return 1;

                        if (!pageB.frontmatter.date) return 1;
                        if (!pageA.frontmatter.date) return -1;

                        return new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime();
                    },
                },
                {
                    key: "timeline",
                    // Only article with date should be added to timeline
                    filter: (page) => page.frontmatter.date instanceof Date,
                    // Sort pages with time
                    sorter: (pageA, pageB) => new Date(pageB.frontmatter.date).getTime() - new Date(pageA.frontmatter.date).getTime(),
                    layout: "Timeline",
                    frontmatter: () => ({
                        title: "Timeline",
                        sidebar: false,
                    }),
                },
            ],
            hotReload: true,
        }),
    ],

    bundler: viteBundler(),
    locales: {
        "/": {
            lang: "zh-CN",
            title: "VuePress",
            description: "Vue 驱动的静态网站生成器",
        },
        "/en/": {
            lang: "en-US",
            title: "VuePress",
            description: "Vue-powered Static Site Generator",
        },
    },
});
