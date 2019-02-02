

一、状态码家族

　　HTTP状态码的第一位数字是表明请求进展情况的一个非常通用的指示。HTTP规范使用1~5作为首数字分别定义了5个状态码家族。

　　1xx：Information

　　仅在HTTP客户端与服务器之间进行协商时使用。

　　2xx：Successful

　　客户端所要求的任意的状态码转换已经发生。

　　3xx：Redirection

　　客户端要求的状态转换没有发生。但是如果客户端愿意发起一个稍有不同的HTTP请求，该请求应该会完成客户端要求的行为。

　　4xx：Client Error

　　由于HTTP请求的问题，导致客户端要求的状态转换没有发生。该请求可能有缺陷、不合逻辑、自相矛盾或者该请求无法被服务器接受。

　　5xx：Server Error

　　由于服务器端的问题，导致客户端要求的状态转换没有发生。客户端或许什么都做不了，只能等待问题被修复。

二、最低限度的四个状态码(200 301 400 500)

　　200(OK)

　　一切都非常顺利，实体消息体重的文档(如果有)是某个资源的一份表述。

　　301(Moved Permanently)

　　当客户端触发了某个将资源从一个URL移动到另一个URL的状态转换时将会发送该状态码。在移动后，向老的URL发送的请求将同样会导致一个301状态码。

　　400（Bad Request）

　　客户端存在问题。实体消息体中的文档(如果有)是一段错误消息。希望客户端能理解错误消息并使用它来修复问题。

　　500(Internal Server Error)

　　服务器端存在问题。实体消息体中的文档是一段错误的消息。该错误消息可能帮不了什么忙，因为客户端不能修复服务器端的问题。

三、状态码列表

　　1xx：Information

　　100(Continue)

　　重要性：低到中等

　　这是应对HTTP look-before-you-leap(LBYL)请求的可能相应中的一种。该状态码指示客户端应该重新发送它的初始请求，包括在首次请求中被省略了的(可能较大或较敏感)表述。客户端不需要担心发送表述后又被拒绝的问题。应对LBYL请求的另一个可能的相应是417(Expectation Failed)。

　　101(Switching Protocols)

　　重要性：非常低

　　客户端只会在当请求中使用了Upgrade报头来通知服务器它想要选择使用排除HTTP之外的别的协议时才会收到该响应码。101状态码的意思是说“没问题，现在我开始使用另外一种协议跟你交谈”。

 

　　2xx：Successful

　　200(OK)

　　重要性：非常高

　　这是客户端大部分情况下希望看到的状态码。它指示状态转换已经结束，并且在2xx系列中找不到更加具体且合适的状态码的时候可以使用它。

　　201(Created)

　　重要性：高

　　当服务器基于客户端的请求创建了新的资源后它会发送改状态码。

　　202(Accepted)

　　重要性：中等

　　客户端的请求不能或者不会被实时地处理，并且将会在后续被处理。

　　203(Non-Authoritative Information)

　　重要性：非常低

　　该状态码与200相同，但是除此之外服务器还想让客户端了解一些并非来自该服务器的相应报头。这些报头可能反映自客户端的前一个请求，或者是从第三方组织获得的。

　　204(No Content)

　　重要性：高

　　该状态码通常在响应例如PUT请求这样的非安全请求时被发送，意思是服务器已经执行了状态转换，但是它拒绝发送回任何表述或状态转换的描述。服务器可能会在对应GET请求的响应中发送回204。这意味着该请求的资源存在，但是它拥有一个空的表述。相比于304(Not Modified)，204通常见于浏览器中的JavaScript应用。它让服务器可以告诉客户端，客户端的输入已经被接受，但是该客户端不应该修改任何的UI元素。

　　205(Requet Content)

　　重要性：低

　　该状态类似于204，但是它暗示了客户端应该重置数据来源的视图或数据结构。如果你在你的Web浏览器中提交了一个HTML表单，并得到了204的响应，那么你的数据仍然还在表单里，而你还可以修改它们。但是如果你得到一个205，这些表单字段将会重置为它们的原始值。

　　206(Partial Conent)

　　重要性：对于支持partial GET 的API来说非常高，而对于其他API则比较比较低。

　　该响应码类似于200，但是它被指定作为partial GET请求的响应：也就是说，该请求使用了Content-Range这一请求报头。客户端通常会发起一个局部请求来恢复一个被中断的大型二进制表述的下载。

　　3xx：Redirection

　　300(Multiple Choices)

　　重要性：低

　　当被请求的资源具有多个表述时，服务器会在不知道客户端想要哪一个表述时发送该状态码。导致这样的原因要么是因为客户端没有使用Accept-*报头来指定表述，要么是因为它所请求的表述并不存在。

　　在这种情况下，服务器可以挑选一个它偏好的表述，然后将它和200状态码一同发回。但是它也可能会决定发送300以及一组链接到不同表述的URI。

　　301(Moved Permanently)

　　重要性：中等

　　服务器知道客户端尝试访问哪个资源，但是客户端并不关心它用于请求资源的URL。它希望客户端能注意到新的URL并在将来的请求中使用新的URL。

　　你可以再API改变了URL结构之后使用该状态码来保持老的URL的可用性，使其不被破坏。

　　302(Found)

　　重要性：重要，不推荐使用

　　该状态码便是大部分与重定向相关的困惑的最终来源。它的处理方式本应该像307那样，而事实上，它在HTTP1.0中的名字是Moved Temporarily。不幸的是，在现实生活中，大部分客户端是像处理303一样来处理302的。与303的区别之处在于当客户端在PUT、POST或者DELETE请求的响应中得到302响应码之后应该做些什么。

　　为了解决歧义，在HTTP1.0中，该响应码已经被重命名为Found，而同时创建了一个新的响应码307.但是302响应码仍然被广泛的使用着，而它是具有歧义的，所以建议应该通过303,307,308来取代302.

　　303(See Other)

　　重要性：高

　　请求已经被处理，但是服务器没有发送响应文本，取而代之的是发送给客户端一个响应文档的URL。这可能是一个静态的状态消息或者是某些更有意思的资源的URL。在后一种方式中，303的服务器在向客户端发送了资源的表述之后却不强制客户端下载所有数据的一种方式。客户端被预期使用的GET请求来访问Location中提到的URL，但是这并不是必须的。

　　303状态码是可以用于对资源进行标准化的一种很好的方式。它科室使你的资源能通过很多URL被访问到，但是每个表述只有一个“真正的”URL。其他所有的URL都是使用303来链接到表述的标准URL。

　　304(Not Modified)

　　重要性：高

　　该状态码与204相似，在啊该响应中，消息体一定是空的。但是204是当没有消息体数据可以发送时使用的，而304是原本有数据，但客户端已经拥有了该数据时使用的，此时没有必要重新发送数据。

　　该状态码是与有条件的HTTP请求同时使用的。如果客户端发送了一个If-Modified-Since报头以及值为Sunday的日期值，并且表述子啊Sunday之后就没有再发生过改变，此时304是非常适合的。使用200也是合适的，但是再次发送表述就会浪费带宽，因为客户端已经拥有该表述了。

　　305(Use Proxy)

　　重要性：低

　　该状态码用于告知客户端应该重复它的请求，但是是通过一个HTTP代理而不是直接发向服务器。该状态码很少被使用，因为服务器很少会关心客户端是否使用了特定代理。该状态码在基于代理的镜像站点中会用得比较频繁。

　　306(Unused)

　　重要性：无

　　306状态码从未被记录到RFC中。它是互联网草案"draft-cohen-http-305-306-responses"中作为切换代理之用描述的，代理服务器发送该状态码来让客户端开始使用另一个不同的代理。该互联网草案在1996年就已经过时。

　　307(Temporary Redirect)

　　重要性：高

　　该请求尚未被处理，因为请求的资源并不存在本URL内：它位于某个其他的URL上。客户端应该向另一个URL重新提交请求。

　　当对应GET请求时，请求的唯一内容就是让服务器发送一个表述，该状态码此时与303相同。一个典型的场景是当服务器想要将发起GET请求的客户端传送到一个镜像站点时，307将是响应的很好选择。但是对于POST、PUT和DELETE请求，服务器逾期将会在对应请求的响应中采取一些动作，这是该状态码与303显著的区别。

　　对应POST、PUT或DELETE的303响应意味着操作已经成功，但是对应请求的本次响应中不会发送实体消息体。如果客户端想要响应的实体消息体，它需要向另一个URL发起GET请求。

　　对应POST、PUT或DELETE的307响应意味着服务器甚至尚未尝试执行操作。客户端需要向Location报头中的URL重新期缴整个请求。

　　308(Permanent Redirect)

　　重要性：中等

　　对应GET请求的308响应与301相似。但是对应非安全请求的308响应工作方式类似307：客户端应该向Location报头中给出的URL重新提交请求。不同之处在于客户端应该在未来它想要发起的任何请求中继续使用该新的URL。

　　4xx：Client-Side Error

　　400(Bad Request)

　　重要性：非常高

　　这是通过的客户端错误状态，当在其他4xx错误码中找不到更合适的选择时可以选择该错误码。通常在客户端通过PUT或POST请求提交表述，并且表述的格式正确，但是表述本身却没有任何意义时，服务器会使用该状态码。

　　401(Unauthorized)

　　重要性：高

　　客户端在没有提供适当的身份认证凭证的时候向受保护的资源发送请求。它可能提供了错误的凭证或完全没有提供凭证。凭证可以使用户名和密码。一个API key或者是一个认证的token——任何API资源质询时所期望的内容。通常客户端向URL发起请求会接收到一个401响应，这样它就知道了该发送什么类型的凭证并采用什么样的格式。事实上，HTTP Digest模式的认证便依赖这种行为。

　　如果服务器并不想向未授权的用户承认资源的存在，它可以选择撒谎并发送404来取代401.这样的负作用是客户端需要提前知道服务器期望对该资源进行什么类型的认证。像HTTP Digest这样的协议将无法正常工作。

　　402(Payment Required)

　　重要性：无

　　除了它的名字之外，该状态码并没有在HTTP标准中进行定义：它是“保留以备将来之用”的。这是因为目前还没有针对HTTP的小额支付系统。这就是说，如果可能出现HTTP的小额支付系统，那么API将会在这些系统出现的地方首当其冲。如果你想通过HTTP请求向你的用户收费，你和他们之间的关系将使得这一点成为可能，而此时你将可以使用该状态码。

　　但是已经存在大量通过请求进行收费的API，而我并不知道有任何这方面的API使用了该状态码。它将可能永远保持“保留”状态。

　　403(Forbidden)

　　重要性：中等

　　客户端的请求格式正确，但是服务器并不想去执行它。不仅仅是因为凭证不足：如果是这样可以使用401.这更像是资源允许在特定时间或来自特定IP段的请求进行访问。403响应以为着客户端向其发起请求的资源真正存在。和401一样，如果如武器甚至连这些信息也不想提供时，它可以选择撒谎并发送一个404取而代之。

　　404(Not Found)

　　重要性：高

　　404大概算是上最著名的HTTP状态码了。404指示了服务器无法将客户端请求的URL映射到任何资源。我们来将它与410进行对比，这样会更加有帮助。请记住，404是任何用于掩盖403或401的一个谎言。有可能资源是存在的，但是服务器并不想让客户端知道这一真相。

　　405(Method Not Allow)

　　重要性：中等

　　客户端尝试使用的某个HTTP方法对应的资源并不支持。举个例子：一个只读资源仅可以支持GET和HEAD。而集和资源通常允许GET和POST，但是并不支持PUT或DELETE。

　　406(Not Acceptable)

　　重要性：中等

　　当客户端对可接受的表述做了很多约束时(可能会使用Accept-*请求报头)，服务器会在无法发送任何表述时发送该响应码。服务器也可以选择忽略客户端的挑剔，简单地发送响应码200以及自己偏好的表述。

　　407(Proxy Authentication Required)

　　重要性：低

　　你只能从HTTP代理看到该状态码。它跟401很像，除了对应的问题不再是你再使用API时没有提供凭证，而是在使用代理时没有提供凭据。跟401一样，该问题可能是因为客户端没有提供凭证，或者提供的凭证损坏或不足。

　　408(Request Timeout)

　　重要性：低

　　如果HTTP客户端打开了一个与服务器之间的连接。但是从不发送请求(或者从不发送标识请求结束的空行)，服务器应该最终发送一个408响应码来关闭这个连接。

　　409(Conflict)

　　重要性：非常高

　　客户端尝试在服务器上创建一个不可能或不一致的资源状态。什么是“不可能” 或 “不一致”取决于API的应用语义。一个基于集合API会允许客户端DELETE一个空的集合，但是当客户端尝试DELETE一个还包含成员的集合时，将会发送409。

　　410(Gone)

　　重要性：中等

　　该响应码很像404，但是它提供了略为更多的信息。当服务器知道所请求的URL曾经指向某个资源，但目前已经不再指向该资源时，就会发送该状态码。服务器并不知道该资源的任何新的URL；如果他知道它可以发送301。

　　与301永久重定向相同的是，410响应码暗示了客户端应该从它当前的词汇表里面去除掉当前的URL，并停止向该URL继续发送请求。与301不同的是，410没有为毁坏的URL提供代替：它指示提供不存在了。RFC2616建议为“那些限时、增值的服务以及那些属于某些不再工作于该服务器站点的个体的资源”使用410响应码。