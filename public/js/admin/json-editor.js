define(['jquery', 'json-editor/dist/jsoneditor.min', 'admin/image', 'jquery.elastic.source', 'domReady!'], function($, jsoneditor, image) {

  // Add a resolver function to the beginning of the resolver list
  // This will make it run before any other ones
  JSONEditor.defaults.resolvers.unshift(function(schema) {
    if (schema.type === "image" && schema.format === "image") {
      return "image";
    }
    // If no valid editor is returned, the next resolver function will be used
  });



  var schema = {
    title: "JSON-editor https://github.com/jdorn/json-editor",
    type: "object",
    properties: {
      price: {
        type: "number",
        title: "Цена",
        description: "Цена одного телефона в гривнах"
      },
      title: {
        type: "string",
        title: "Заголовок (title)",
        description: "Отображается в заголовке веб-браузера"
      },
      meta: {
        type: "array",
        items: {
          type: "string"
        }
      },
      parthners: {
        type: "array",
        description: "Для рекламы в полосе прокрутки",
        title: "Партнеры",
        format: "tab",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              default: ""
            },
            url: {
              type: "string",
              format: "url",
              default: ""
            },
            banner: {
              type: "image",
              title: "Загрузите файл с Вашего компьютера",
              format: "image",
            }
          }
        }
      },
      page: {
        type: "object",
        patternProperties: {
          '.+': {
            type: "object",
            patternProperties: {
              '.+': {
                type: "string",
                format: "textarea"
              }
            }
          }
        }
      }
    }
  };

  var $schema = document.getElementById('schema');
  var $output = document.getElementById('output');
  var $editor = document.getElementById('editor');
  var $save = document.getElementById('save');

  var jsoneditor = new JSONEditor($editor, {
    schema: schema,
    //theme: "bootstrap3",
    theme: "foundation5"
  });

  jsoneditor.setValue(JSON.parse($output.value));

  jsoneditor.on("change", function(e) {
    var json = jsoneditor.getValue();
    var jsonValue = JSON.stringify(json, null, 2);
    $.ajax({
        url: "post",
        method: "POST",
        contentType: "text/json",
        data: jsonValue
      })
      .done(
        function(data, textStatus, jqXHR) {}).then(function() {});
  });

  $("#save").on("click", function(e) {
    var json = jsoneditor.getValue();
    var jsonValue = JSON.stringify(json, null, 2);
    $.ajax({
        url: "post",
        method: "POST",
        contentType: "text/json",
        data: jsonValue
      })
      .done(function(data, textStatus, jqXHR) {})
      .then(function() {});
    $.ajax({
        url: "publish",
        method: "POST",
        contentType: "text/json",
        data: jsonValue
      })
      .done(function(data, textStatus, jqXHR) {
        $('<H1 style="font-size:70pt;color:green;position:absolute;">Данные опубликованы</H1>').insertAfter('#save').delay(3000).fadeOut();
      })
      .fail(function() {
        $('<H1 style="font-size:70pt;color:red;position:absolute;">Проиошла ошибка</H1>').insertAfter('#save').delay(3000).fadeOut();
      });
  });


  $("textarea").css("height", "auto");
  $("textarea").elastic();


});
