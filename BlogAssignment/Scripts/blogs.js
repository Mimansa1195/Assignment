var _blogId = 0;
$(document).ready(function () {
    bindBlogs();
});

$("#btnEditClose").click(function () {
    $("#editBlogPopup").modal("hide");
    $("#titleEdit").removeClass('error-validation');
    $("#descriptionEdit").removeClass('error-validation');
    $("#titleEdit").val("");
    $("#descriptionEdit").val("");
});

$("#btnClose").click(function () {
    $("#addBlogPopup").modal("hide");
    $("#title").removeClass('error-validation');
    $("#description").removeClass('error-validation');
    $("#title").val("");
    $("#description").val("");
});
$("#btnSaveBlog").click(function () {
    debugger;
    var jsonObject = {
        blogId: _blogId,
        title: $("#title").val(),
        description: $("#description").val(),
    }
    calltoAjax(misApiUrl.addBlog, "POST", jsonObject,
        function (result) {
            var resultData = $.parseJSON(JSON.stringify(result));
            $("#addBlogPopup").modal('hide');
            bindBlogs();
        });
});
$("#btnEditBlog").click(function () {
    var jsonObject = {
        blogId : _blogId,
        title: $("#titleEdit").val(),
        description: $("#descriptionEdit").val(),
    }
    calltoAjax(misApiUrl.addBlog, "POST", jsonObject,
        function (result) {
            var resultData = $.parseJSON(JSON.stringify(result));
            $("#editBlogPopup").modal('hide');
            bindBlogs();
        });
});
function bindBlogs() {
    calltoAjax(misApiUrl.getAllBlogs, "POST", "",
        function (result) {
            debugger;
            var resultData = $.parseJSON(JSON.stringify(result));
            $("#tblBlogs").dataTable({
                "dom": 'lBfrtip',
                "responsive": true,
                "autoWidth": false,
                "paging": true,
                "bDestroy": true,
                "ordering": true,
                "order": [],
                "info": true,
                "deferRender": true,
                "aaData": resultData,
                "aoColumns": [
                    {
                        "mData": "Description",
                        "sTitle": "Description",

                    },
                    {
                        "mData": "Title",
                        "sTitle": "Title",
                    },
                    {
                        "mData": null,
                        "sTitle": "Action",
                        'bSortable': false,
                        "sClass": "text-center",
                        "sWidth": "300px",
                        mRender: function (data, type, row) {
                            var html = '<div>';
                            html += '&nbsp;<button type="button" class="btn btn-sm btn-success" onclick="editBlogPopup(\'' + row.BlogId + '\')" data-toggle="tooltip" title="Edit"><i class="fa fa-add"> </i></button>';
                            html += '&nbsp;<button type="button" class="btn btn-sm btn-danger" onclick="deleteBlogPopup(\'' + row.BlogId + '\')" data-toggle="tooltip" title="Delete Blog"><i class="fa fa-times"> </i></button>';
                            html += '</div>';
                            return html;
                        }
                    },
                ]
            });
        });
}
function addBlogPopup() {
    $("#addBlogPopup").modal("show");
}
function editBlogPopup(blogId) {
    _blogId = blogId;
    $("#titleEdit").val("");
    $("#descriptionEdit").val("");
    var jsonObject = {
        blogId: blogId
    }
    calltoAjax(misApiUrl.getBlogById, "POST", jsonObject,
        function (result) {
            debugger;
            var resultData = $.parseJSON(JSON.stringify(result));
            $("#editBlogPopup").modal("show");
            $("#titleEdit").val(resultData.Title);
            $("#descriptionEdit").val(resultData.Description);
        });
}

function deleteBlogPopup(blogId) {
    debugger;
    var jsonObject = {
        blogId: blogId
    }
    calltoAjax(misApiUrl.deleteBlog, "POST", jsonObject,
        function (result) {
            bindBlogs();
        });

}
