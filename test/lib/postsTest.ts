import assert from "assert";
import path from "path";
import PostUtil from "../../lib/postUtil";

const postUtil = new PostUtil(path.join(process.cwd(), "test/lib/Fixtures"));

function withGetSortedPostsData() {
  assert.deepEqual(postUtil.getSortedPostsData(), [
    {
      id: "post-latest",
      title: "piyopiyo",
      date: "2020-11-21",
    },
    {
      id: "post-older",
      title: "hogehoge",
      date: "2020-01-01",
    },
  ]);
}

function withGetAllPostIds() {
  assert.deepEqual(postUtil.getAllPostIds(), [
    {
      params: {
        id: "post-latest",
      },
    },
    {
      params: {
        id: "post-older",
      },
    },
  ]);
}

async function withGetPostData() {
  try {
    const postData = await postUtil.getPostData("post-latest");
    assert.deepEqual(postData, {
      id: "post-latest",
      contentHtml:
        "<p>hogepiyo</p>\n" +
        '<pre><code class="hljs language-javascript"><span class="hljs-keyword">const</span> hogepiyo = <span class="hljs-number">1</span>;</code></pre>\n',
      title: "piyopiyo",
      date: "2020-11-21",
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

[withGetSortedPostsData, withGetAllPostIds, withGetPostData].forEach((fn) =>
  fn()
);
