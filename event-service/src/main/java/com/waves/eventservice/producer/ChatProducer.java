package com.waves.eventservice.producer;

import com.waves.eventservice.model.Dto.ChatUser;
import com.waves.eventservice.model.Dto.EventDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.kafka.support.SendResult;
import org.springframework.stereotype.Service;

import java.util.concurrent.CompletableFuture;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatProducer {

    private final KafkaTemplate<String, ChatUser> chatUserKafkaTemplate;

    private final KafkaTemplate<String, EventDto> eventKafkaTemplate;

    public void createChatUser(ChatUser chatUser){

        try{
            CompletableFuture<SendResult<String,ChatUser>> future = chatUserKafkaTemplate.send("add-chat-user",chatUser);
            future.whenComplete((result,ex)->{
                if(ex == null){
                    log.info("Sent message=[" + chatUser.toString() +
                            "] with offset=[" + result.getRecordMetadata().offset() + "]");
                }
                else{
                    log.info("Unable to send message=[" +
                            chatUser.getEmailId() + "] due to : " + ex.getMessage());
                }
            });
        }
        catch(Exception exception){
            log.info("Error : "+ exception.getMessage());
        }
    }

    public void createChatRoom(EventDto eventDto){

        try{
            CompletableFuture<SendResult<String,EventDto>> future = eventKafkaTemplate.send("create-chat-room",eventDto);
            future.whenComplete((result,ex)->{
                if(ex == null){
                    log.info("Sent message=[" + eventDto.toString() +
                            "] with offset=[" + result.getRecordMetadata().offset() + "]");
                }
                else{
                    log.info("Unable to send message=[" +
                            eventDto.getEventName() + "] due to : " + ex.getMessage());
                }
            });
        }
        catch (Exception exception){
            log.info("Error : "+ exception.getMessage());
        }
    }

    public void updateChatRoom(EventDto eventDto){

        try{
            CompletableFuture<SendResult<String,EventDto>> future = eventKafkaTemplate.send("update-chat-room",eventDto);
            future.whenComplete((result,ex)->{
                if(ex == null){
                    log.info("Sent message=[" + eventDto.toString() +
                            "] with offset=[" + result.getRecordMetadata().offset() + "]");
                }
                else{
                    log.info("Unable to send message=[" +
                            eventDto.getEventName() + "] due to : " + ex.getMessage());
                }
            });
        }
        catch (Exception exception){
            log.info("Error : "+ exception.getMessage());
        }
    }

}
