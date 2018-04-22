<template>
  <div class="image-editor">
    <div class="cropper">
      <img id="cropimg1" alt="">
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
.image-editor {
  .cropper {
    box-sizing: border-box;
    border: 1px solid #c3c3c3;
    width: 500px;
    height: 300px;

    img {
      max-height: 100%;
    }
  }

  .fileinput {
    display: none;
  }

  .filelabel {
    display: block;
    padding: 6px 15px;
    background: #2d8cf0;
    display: inline-block;
    border: 1px solid #2d8cf0;
    border-radius: 4px;
    cursor: pointer;
    color: white;
    font-size: 12px;
    text-align: center;
    transition: all 0.2s;

    &:hover {
      background: #5cadff;
      border: 1px solid #5cadff;
      transition: all 0.2s;
    }
  }
}
</style>

