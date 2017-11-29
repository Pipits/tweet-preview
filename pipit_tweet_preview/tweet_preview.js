const maxTweetLength = 280;
const urlLength = 23;
const url_placeholder = '{URL}';
const urlRegex = /(http|https):\/\/[\w-]+(\.[\w-]+)+([\w.,@?^=%&amp;:\/~+#-]*[\w@?^=%&amp;\/~+#-])?/g;

var overLimit = false;
var diff = 0;
var virtualMaxTweetLength = maxTweetLength;

var inputs = document.getElementsByTagName('input');
var textareas = document.getElementsByTagName('textarea');
var twitter_via = twitter_tags = twitter_desc = '';

//endsWith polyfill
if (!String.prototype.endsWith)
String.prototype.endsWith = function(searchStr, Position) {
    // This works much better than >= because
    // it compensates for NaN:
    if (!(Position < this.length))
      Position = this.length;
    else
      Position |= 0; // round position
    return this.substr(Position - searchStr.length,
                       searchStr.length) === searchStr;
};


String.prototype.replaceAtWith=function(index, replacement) 
{
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}




for(i=0; i<inputs.length; i++)
{
    if(inputs[i].id.endsWith('sharing_twitter_desc'))
    {
        twitter_desc = inputs[i];
        twitter_desc.addEventListener('input', parseTweet);
        twitter_desc.addEventListener('change', parseTweet);
        twitter_desc.addEventListener('keydown', parseTweet);
    }
    if(inputs[i].id.endsWith('sharing_twitter_tags'))
    {
        twitter_tags = inputs[i];
        twitter_tags.addEventListener('input', parseTweet);
        twitter_tags.addEventListener('change', parseTweet);
        twitter_tags.addEventListener('keydown', parseTweet);
    }
    if(inputs[i].id.endsWith('sharing_twitter_via'))
    {
        twitter_via = inputs[i];
        twitter_via.addEventListener('input', parseTweet);
        twitter_via.addEventListener('change', parseTweet);
        twitter_via.addEventListener('keydown', parseTweet);
    }
}

for(i=0; i<textareas.length; i++)
{
    if(textareas[i].id.endsWith('sharing_twitter_desc'))
    {
        twitter_desc = textareas[i];
        twitter_desc.addEventListener('input', parseTweet);
        twitter_desc.addEventListener('change', parseTweet);
        twitter_desc.addEventListener('keydown', parseTweet);
    }
}




if(twitter_desc)
{
  var tweet = document.createElement("div");
  tweet.id = 'pipit-tweet';
  
  var tweet_header = document.createElement("h4");
  var header_node = document.createTextNode('Tweet Preview');
  tweet_header.appendChild(header_node);
  
  var tweet_content = document.createElement("div");
  tweet_content.id = 'pipit-tweet_content';
  
  var tweet_count = document.createElement("div");
  tweet_count.id = 'pipit-tweet_count';
  var count_node = document.createTextNode(maxTweetLength);
  tweet_count.appendChild(count_node);
  
  twitter_desc.parentElement.appendChild(tweet);
  tweet.appendChild(tweet_header);
  tweet.appendChild(tweet_content);
  tweet.appendChild(tweet_count);
  
  parseTweet();
}





function refresh(str)
{
  diff = calcChars(str);
  tweet_count.innerHTML = diff;
  handleStates(diff);
}





function calcChars(str)
{
  var charCount = str.length;
  var urls = str.match(urlRegex);
  var alter = 0;
  virtualMaxTweetLength = maxTweetLength;
  
  // calc URLs as 23 chars
  if(urls)
  {
    var totalUrls = 0;
    alter = urlLength * urls.length;
    
    for(i in urls)
    {
      totalUrls += urls[i].length;
    }
    charCount = (str.length - totalUrls) + alter;
    virtualMaxTweetLength = (maxTweetLength - alter) + totalUrls;
  }

  // calc placeholder as 23
  charCount -= url_placeholder.length;
  charCount += 23;

  return maxTweetLength - charCount;
}





function handleStates(diff)
{
  if(diff<0)
  {
    overLimit = true;
    tweet_count.className = 'pipit-tweet_warning';
  }
  else if(diff>=0)
  {
    overLimit = false;
    tweet_count.className = '';
  }
}





function parseTweet()
{ 
    var str = twitter_desc.value;
    str += ' '+url_placeholder;
    
    if(twitter_tags.value)
    {
      var tags = parseTags(twitter_tags.value);
      for(i in tags)
      {
        str += tags[i];
      }
    }

    if(twitter_via.value)
    {
      if(twitter_via.value.charAt(0) === '@')
      {
        var via = ' via '+twitter_via.value;
      }
      else
      {
        var via = ' via @'+twitter_via.value;
      }
      str += via;
    }


    refresh(str);

    if(overLimit)
    {
      var danger = '<span class="pipit-tweet_warning">' + str.substr(virtualMaxTweetLength, str.length) + '</span>';
      str = str.replaceAtWith(virtualMaxTweetLength, danger);
    }
    
    // highlights
    str = str.replace(/(#|@)\w+/g, function(value){
      return '<span class="pipit-tweet_link">' + value + '</span>';
    });

    str = str.replace(urlRegex, function(value){
      return '<span class="pipit-tweet_link">' + value + '</span>';
    });

    str = str.replace('{URL}', function(value){
      return '<span class="pipit-tweet_link">' + value + '</span>';
    });
    
    tweet_content.innerHTML = str;
}





function parseTags(tags)
{ 
  tags = tags.replace(/( )/g, '');
  if(tags)
  {
    tags = tags.split(',');
    for(i in tags)
    {
      if(tags[i].charAt(0) !== '#')
      {
        tags[i] = ' #' + tags[i];
      }
      else
      {
        tags[i] = ' ' + tags[i];
      }
    }
  }
  else
  {
    tags = [];
  }

  return tags;
}