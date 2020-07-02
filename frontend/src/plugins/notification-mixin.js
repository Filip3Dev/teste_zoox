export default {
  methods: {
    showErrorToast({
      title,
      text = '',
    }) {
      return this.$swal({
        title,
        text,
        toast: true,
        showConfirmButton: false,
        icon: 'error',
        timer: 3000,
        timerProgressBar: true,
        position: 'top-end',
        customClass: {
          title: 'dialog-ok-title',
          content: 'dialog-content',
          confirmButton: 'dialog-confirm-button-class',
        },
      });
    },
    showSuccessToast({
      title,
      text = '',
    }) {
      return this.$swal({
        title,
        text,
        toast: true,
        showConfirmButton: false,
        icon: 'success',
        timer: 3000,
        timerProgressBar: true,
        position: 'top-end',
        customClass: {
          title: 'dialog-ok-title',
          content: 'dialog-content',
          confirmButton: 'dialog-confirm-button-class',
        },
      });
    },
    showOkDialog({
      title,
      text,
      confirmButtonText = 'OK',
      width = '27em',
      confirmButtonColor = '#FFFFFF',
    }) {
      return this.$swal({
        title,
        text,
        confirmButtonText,
        confirmButtonColor,
        width,
        customClass: {
          title: 'dialog-ok-title',
          content: 'dialog-content',
          confirmButton: 'dialog-confirm-button-class',
        },
      });
    },
    showConfirmDeleteDialog({
      title,
      text,
    }) {
      return this.showConfirmDialog({
        title,
        text,
      });
    },
    showConfirmDialog({
      title,
      text,
      confirmButtonText = 'SIM',
      cancelButtonText = 'NÃO',
      confirmButtonColor = '#FFFFFF',
      cancelButtonColor = '#FFFFFF',
      customClassTitle = 'dialog-confirm-title',
      contentClass = 'dialog-content',
      headerClass = 'dialog-header',
      actionsClass = 'dialog-actions',
      input,
      inputPlaceholder,
      inputValidator,
      width = '27em',
    }) {
      return this.$swal({
        title,
        text,
        confirmButtonText,
        cancelButtonText,
        confirmButtonColor,
        cancelButtonColor,
        showCancelButton: true,
        reverseButtons: true,
        allowOutsideClick: false,
        width,
        input,
        inputPlaceholder,
        inputValidator,
        customClass: {
          title: customClassTitle,
          header: headerClass,
          content: contentClass,
          actions: actionsClass,
          confirmButton: 'dialog-confirm-button-class',
          cancelButton: 'dialog-cancel-button-class',
        },
      });
    },
  },
};
