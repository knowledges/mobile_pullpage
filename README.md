# mobile_pullpage
全屏 手机翻页

<h1>注意事项：</h1>
1.手机项目比较恶心，我开始的时候响对魅族等国产手机，不能完全支持W3C 标准的 手机浏览器感到很是蛋疼，所有在这里给大家分享一下，
在页面内容尽量采用  position: relative;  内容的具体位置最好不要用 top，left...百分比，你可以采用margin、padding 来达到你
想要的视图效果。你可以试试，如果你跟好的解决方法可以告诉我。

下面为新手准备的：（有经验的勿喷）
2.页面里面采用的是touch 事件，所以click 是不管用的，如果你像加click 事件，在 touchEnd_Method 方法中，添加你的touch 事件,
绑定元素（label）上。从而实现click 事件。
