$(document).ready(function () {
    const $quiz = $('.quizSection');
    const totalSteps = $quiz.find('.question-box').length;
    let currentStep = 1;
    let score = 0;
  
    function updateProgress(step) {
      $quiz.find('#progressBar .progress-circle').each(function (i) {
        const index = i + 1;
        $(this).removeClass('active complete');
        if (index < step) {
          $(this).addClass('complete');
        } else if (index === step) {
          $(this).addClass('active');
        }
      });
    }
  
    $quiz.find('.answers .btn').on('click', function () {
        const $selectedBtn = $(this);
        const $allBtns = $selectedBtn.closest('.answers').find('.btn');
        const correctAnswer = String($selectedBtn.closest('.question-box').data('correct')).trim();
      
        $allBtns.prop('disabled', true).removeClass('btn-success btn-danger').addClass('btn-outline-primary');
      
        if ($selectedBtn.text().trim() === correctAnswer) {
          $selectedBtn.removeClass('btn-outline-primary').addClass('btn-success');
          score++;
        } else {
          $selectedBtn.removeClass('btn-outline-primary').addClass('btn-danger');
          $allBtns.each(function () {
            if ($(this).text().trim() === correctAnswer) {
              $(this).removeClass('btn-outline-primary').addClass('btn-success');
            }
          });
        }
      
        $quiz.find('#nextBtn').prop('disabled', false);
    });
      
  
    $quiz.find('#nextBtn').on('click', function () {
      if (currentStep < totalSteps) {
        $quiz.find(`.question-box[data-step="${currentStep}"]`).removeClass('active');
        currentStep++;
        $quiz.find(`.question-box[data-step="${currentStep}"]`).addClass('active');
        $(this).prop('disabled', true);
        updateProgress(currentStep);
      } else {
        // Show modal instead of alert
        $('#quizResultText').text(`Your score is ${score} out of ${totalSteps}`);
        const resultModal = new bootstrap.Modal(document.getElementById('quizResultModal'));
        resultModal.show();
      }
    });
  
    // Initialize
    updateProgress(currentStep);
  });
  